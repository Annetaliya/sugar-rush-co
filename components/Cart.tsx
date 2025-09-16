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
    <div className="flex gap-4">
        <h1 className="text-center text-3xl pt-6">Your Cart</h1>
        <div>
            {cartItems.length === 0 ? <p>No items</p> 
            : cartItems.map((item) => (
                <li key={item.product_id}>
                    <div>
                        <img className='productImage' src={item.image_url} alt='cookies' />
                        <div>
                            <h2>{item.name}</h2>
                            <p>{item.price * item.quantity}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => dispatch(removeFromCart(item.product_id))}
                        className="cartBtn"
                        >
                        Remove
                    </button>

                </li>
            ))
            }
        </div>
        <div>
            <h2 className="pt-6 text-3xl">Total: ${total}</h2>
            <button 
                onClick={() => dispatch(clearCart())}
                className="cartBtn mt-4"
                >
                Clear cart

            </button>
        </div>
    </div>
  )
}

export default Cart