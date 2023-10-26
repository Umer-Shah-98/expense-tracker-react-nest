import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./auth-slice";
// import accountSlice from "./account-slice";
// import categorySlice from "./category-slice";
// import transactionSlice from "./transaction-slice";
import { useDispatch as useAppDispatch } from "react-redux";
import { rootReducers } from "./rootReducers";

const store = configureStore({
  reducer: rootReducers,
});

export const { dispatch } = store;

const useDispatch = () => useAppDispatch();

export default store;
