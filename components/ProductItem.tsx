"use client"
import React, {useState, useEffect} from 'react'

type Product = {
    product_id: string;
    name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    image_url?: string;

}

const ProductItem = () => {
    const [product, setProduct] = useState<Product | null>(null);

    const fetchProduct = async (id: string) => {
        try {
            const response = await fetch(`api/products/${id}`);
            const result = await response.json()
            setProduct(result)


        } catch (error) {

        }
    }
  return (
    <div>ProductItem</div>
  )
}

export default ProductItem