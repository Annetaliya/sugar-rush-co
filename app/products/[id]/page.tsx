"use client"; // ✅ lowercase "client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  product_id: string;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    // 1. Check localStorage first
    const localProduct = localStorage.getItem("selectedProduct");
    if (localProduct) {
      const parsed = JSON.parse(localProduct) as Product;
      if (parsed.product_id === id) {
        setProduct(parsed);
        return; // ✅ stop here, no need to fetch
      }
    }

    // 2. Otherwise fetch from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const result = await response.json();
        setProduct(result);

        // Save to localStorage
        localStorage.setItem("selectedProduct", JSON.stringify(result));
      } catch (error) {
        console.log("Error getting product", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img
        src={product.image_url}
        alt={product.name}
        className="w-64 h-64 object-cover"
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="mt-2 text-xl font-semibold">${product.price}.00</p>
    </div>
  );
}
