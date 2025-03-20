import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/cartSlice"; // Make sure this path is correct

export const store = configureStore({
    reducer: {
        cart: cartReducer, // Ensure `cart` matches what you access in `useSelector`
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
