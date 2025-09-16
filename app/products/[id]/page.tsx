"use client"; 

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addToCart } from "@/redux/auth/cartSlice";
import { useAppDispatch } from "@/redux/userStore";
import { useAppSelector } from "@/redux/userStore";

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
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items)

  useEffect(() => {
    if (!id) return;

    // 1. Check localStorage first
    const localProduct = localStorage.getItem("selectedProduct");
    if (localProduct) {
      const parsed = JSON.parse(localProduct) as Product;
      if (parsed.product_id === id) {
        setProduct(parsed);
        return; 
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

  const handleAddToCart = () => {
    if (!product) return

    dispatch(
      addToCart({
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        image_url: product.image_url ?? "",
        quantity,

      })
    )
    
   
  }

  useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  console.log("Cart updated:", cartItems);
}, [cartItems]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex justify-center gap-6">
        <div className="ml-8 mt-8">
            <img
            src={product.image_url}
            alt={product.name}
            className="w-64 h-64 object-cover"
            />
            <div className="max-w-80 mt-8">
                <p className="mt-2">{product.description}</p>

            </div>
            
            
        </div>
        <div className="product-details bg-zinc-200 ml-8 mt-6 pl-4 pr-4 drop-shadow-xl ">
            <h1 className="text-2xl font-bold mt-4 pb-4">{product.name}</h1>
            
            <p className="mt-2 text-xl font-semibold pb-4">${product.price}.00</p>    
            
            <div className="flex items-center gap-4 pb-6">
                <p className="pb-4">Quantity:</p>
                <button 
                    className="addBtn bg-zinc-50"
                    onClick={() => setQuantity((prev) => prev < product.stock_quantity ? prev + 1 : prev)}
                    >
                        +
                </button>
                <span className="px-2 font-semibold">{quantity}</span>
                <button 
                    className="addBtn bg-zinc-50"
                    onClick={() => setQuantity((prev) => prev > 1 ? prev - 1 : 1)}
                    >
                    -
                </button>
            </div>
            <button onClick={handleAddToCart} className="cartBtn">Add to cart</button>
            
            
        </div>
      
      
    </div>
  );
}
