"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Product = {
  product_id: string;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
}
export default function Home() {

const [product, setProduct] = useState<Product[]>([]);
const [loading, setLoading] = useState(false)
const router = useRouter()



async function fetchProducts() {
  try {
    setLoading(true);
    const repsonse = await fetch('/api/products');
    const result = await repsonse.json();
    
    console.log('this are the products', result)
    setProduct(result)
    setLoading(false)

  } catch(error) {
    console.log('Error fetching products:', error)

  } 

 
}

 useEffect(() => {
    fetchProducts()

  }, [])

  if (loading) {
    return (
      <div className="flex justify-center mt-2">
          <button type="button" className="flex items-center gap-2 text-white font-bold pt-2 pb-2 pl-4 pr-4 bg-indigo-500 ..." disabled>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise animate-spin ..." viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
            </svg>
                Processing…
            </button>
      </div>
 
    )
  }

  const handleViewProduct = (item: Product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(item))
    router.push(`/products/${item.product_id}`)
    console.log('product selected details:', item)

  }
  return (
    <div className="font-sans min-h-screen p-0 m-0">
      <div className="heroImage pb-6">
        <h2 className="font-extrabold text-white text-center text-8xl pt-10 heroHeader">Bake. Bite. Bliss</h2>
        <p className="text-center text-2xl text-white heroParagraph">Your new favourite cookie is here.</p>
       
      </div>
      <div>
        <h1 className="text-4xl pt-8 pb-4 ml-2 text-center">Where everybite feels like home</h1>
        <p className="ml-2 text-center text-gray-500">Freshly baked, handcrafted cookies made with love and the finest ingredients.<br />Delivered right to your doorstep.</p>
        <button className="explore ml-2">Explore</button>
      </div>
      <div className="productsContainer">
      {product.length > 0 ? 
      product.map((item) => (
        <div key={item.product_id} onClick={() => handleViewProduct(item)} className="secondProductContainer drop-shadow-md">
          <img className="productImage transform transition-transform duration-1000 ease-in-out hover:scale-90" src={item.image_url} alt="dessert"/>
          <div className="mt-4 pl-3">
            <h3 className="font-extrabold text-2xl pb-2">{item.name}</h3>
            <p className="text-sm pb-2 text-gray-500">{item.description}</p>
            <p className="pb-6 text-gray-600">${item.price}.00</p>
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
