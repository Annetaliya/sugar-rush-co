import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type CartItem = {
    product_id: string;
    quantity: number;
    price: number;
    name: string;
    image_url: string;

}

type CartState = {
    items: CartItem[]
}

const initialState : CartState = {items: []}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state,  action:PayloadAction<CartItem>) => {
            const existing = state.items.find((item) => 
                item.product_id === action.payload.product_id
            );
            if (existing) {
                existing.quantity += action.payload.quantity
            } else {
                state.items.push(action.payload)
            }

        },
        removeFromCart: (state, action:PayloadAction<string>) => {
            state.items = state.items.filter((item) => 
                item.product_id !== action.payload )
        },
        clearCart: (state) => {
            state.items = []

        },
    }
    
})
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer;
