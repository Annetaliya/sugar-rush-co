import { configureStore } from "@reduxjs/toolkit";
import userReducer from './auth/authSlice'
import cartReducer from './auth/cartSlice'
import searchReducer from './auth/searchSlice'
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        search: searchReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;