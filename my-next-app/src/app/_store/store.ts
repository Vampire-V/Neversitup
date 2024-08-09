import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todoReducer from "./todoSlice";
export const store = configureStore({
  reducer: { todo: todoReducer },
});

// create and export typed-hooks in file
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
