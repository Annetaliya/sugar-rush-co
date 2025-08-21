"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
}

export default function Home() {

const [product, setProduct] = useState<Product[]>([]);;

async function fetchProducts() {
  try {
    const repsonse = await fetch('/api/products');
    const result = await repsonse.json();
    
    console.log('this are the products', result)
    setProduct(result)

  } catch(error) {
    console.log('Error fetching products:', error)

  }

 
}

 useEffect(() => {
    fetchProducts()

  }, [])
  return (
    <div className="font-sans min-h-screen p-0 m-0">
      <div className="heroImage">
        <h2 className="font-extrabold text-white text-center text-8xl pt-10 heroHeader">Bake. Bite. Bliss</h2>
        <p className="text-center text-2xl text-white heroParagraph">Your new favourite cookie is here.</p>
       
      </div>
      <div>
      {product.length > 0 ? 
      product.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>

        </div>
      ))
      : <p></p>
      }
      

      </div>
    
      
    </div>
  );
}
