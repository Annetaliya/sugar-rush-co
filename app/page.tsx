"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

type Product = {
  product_id: string;
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
      <div className="heroImage pb-6">
        <h2 className="font-extrabold text-white text-center text-8xl pt-10 heroHeader">Bake. Bite. Bliss</h2>
        <p className="text-center text-2xl text-white heroParagraph">Your new favourite cookie is here.</p>
       
      </div>
      <div>
        <h1 className="text-6xl pt-8 pb-4 ml-2">Where everybite feels like home</h1>
        <p className="ml-2">Freshly baked, handcrafted cookies made with love and the finest ingredients. Delivered right to your doorstep.</p>
        <button>Explore</button>
      </div>
      <div className="productsContainer">
      {product.length > 0 ? 
      product.map((item) => (
        <div key={item.product_id} className="secondProductContainer drop-shadow-md ">
          <img className="productImage transform transition-transform duration-300 ease-in-out hover:scale-90" src={item.image_url} alt="dessert"/>
          <div className="mt-4 pl-3">
            <h3 className="font-extrabold text-lg pb-2">{item.name}</h3>
            <p className="text-sm pb-2">{item.description}</p>
            <p className="pb-6">${item.price}.00</p>
          </div>
          
          <button className="cartBtn">Add cart</button>
          

        </div>
      ))
      : <p>No Items</p>
      }
      

      </div>
    
      
    </div>
  );
}
