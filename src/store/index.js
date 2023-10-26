import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import accountSlice from "./account-slice";
import categorySlice from "./category-slice";
import transactionSlice from "./transaction-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
  },
});
export default store;
