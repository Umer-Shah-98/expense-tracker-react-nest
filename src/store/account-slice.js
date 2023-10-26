import { createSlice } from "@reduxjs/toolkit";
const totalBalance = (accounts) => {
  return accounts.reduce((total, account) => total + account.balance, 0);
};
const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    totalBalance: 0,
  },
  reducers: {
    addAccount(state, action) {
      const accounts = action.payload;
      state.accounts = accounts;
      state.totalBalance = totalBalance(accounts); // Calculate and set the total balance
    },
    updateAccount(state, action) {
      const newAccount = action.payload;

      state.accounts.push(newAccount);
      const accounts = state.accounts;
      state.totalBalance = totalBalance(accounts); // Calculate and set the total balance
    },
    updateAccountAmount(state, action) {
      const account = action.payload;
      const { accountId, type, amount,createdAt } = account;

      // Find the index of the category in the state array
      const accountIndex = state.accounts.findIndex(
        (acc) => acc._id === accountId
      );

      if (accountIndex !== -1) {
        // Create a copy of the category to update it immutably
        const updatedAccount = { ...state.accounts[accountIndex] };

        // Update the category's amount based on the type
        if (type === "INCOME") {
          updatedAccount.balance += amount;
          updatedAccount.updatedAt = createdAt;
        } else if (type === "EXPENSE") {
          updatedAccount.balance -= amount;
          updatedAccount.updatedAt = createdAt;

        }

        // Create a new state object with the updated category
        const updatedAccounts = [...state.accounts];
        updatedAccounts[accountIndex] = updatedAccount;

        // Update the state with the new categories array
        state.accounts = updatedAccounts;
        const accounts = state.accounts;
        state.totalBalance = totalBalance(accounts); // Calculate and set the total balance
      }
    },
    deleteAccount(state, action) {
      state.accounts = [];
    },
  },
});
export const accountActions = accountSlice.actions;
export default accountSlice;
