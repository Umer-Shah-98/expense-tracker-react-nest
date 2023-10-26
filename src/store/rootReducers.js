import { combineReducers } from "@reduxjs/toolkit";
import accountSlice from "./account-slice";
import authSlice from "./auth-slice";
import categorySlice from "./category-slice";
import transactionSlice from "./transaction-slice";

export const rootReducers = combineReducers({
  auth: authSlice.reducer,
  account: accountSlice.reducer,
  category: categorySlice.reducer,
  transaction: transactionSlice.reducer,
});
