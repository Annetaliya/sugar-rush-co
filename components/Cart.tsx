"use client"
import { useAppSelector, useAppDispatch } from "@/redux/userStore";
import { removeFromCart, clearCart } from "@/redux/auth/cartSlice";
import React from 'react'

type Product = {
  product_id: string;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
};

const Cart = () => {
    const cartItems = useAppSelector((state) => state.cart.items)
    const dispatch = useAppDispatch()

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0 )
  return (
    <div>
        <h1>Your Cart</h1>
        <div>
            {cartItems.length === 0 ? <p>No items</p> 
            : cartItems.map((item) => (
                <li key={item.product_id}>
                    <div>
                        <img src={item.image_url} alt='cookies' />
                        <div>
                            <h2>{item.name}</h2>
                            <p>{item.price * item.quantity}</p>
                        </div>
                    </div>

                </li>
            ))
            }
        </div>
    </div>
  )
}

export default Cart