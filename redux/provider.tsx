"use client"
import { Provider } from "react-redux"
import { store } from "./userStore"
import { use, useEffect } from "react";
import { useAppDispatch } from "./userStore";
import { addToCart } from "./auth/cartSlice";

function CartHydrator () {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const saved = localStorage.getItem('cartItems')
        if (saved) {
            const items = JSON.parse(saved)
            items.forEach((item: any) => dispatch(addToCart(item)))
        }

    },[dispatch])
    return null
}

export function ReduxProvider({children}: {children: React.ReactNode}) {
    return <Provider store={store}>
        <CartHydrator />
        {children}
        </Provider>
}