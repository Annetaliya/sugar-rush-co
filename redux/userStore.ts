import { configureStore } from "@reduxjs/toolkit";
import userReducer from './auth/authSlice'
import cartReducer from './auth/cartSlice'
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;