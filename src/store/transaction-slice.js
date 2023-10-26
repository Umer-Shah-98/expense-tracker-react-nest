import { createSlice } from "@reduxjs/toolkit";
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    recentTransactions: [],
    totalIncomeAmount: 0,
    totalExpenseAmount: 0,
  },
  reducers: {
    addTransaction(state, action) {
      const transactions = action.payload;
      state.transactions = transactions;
      // Recalculate the total income and expense amounts
      state.totalIncomeAmount = calculateTotalAmount(transactions, "INCOME");
      state.totalExpenseAmount = calculateTotalAmount(transactions, "EXPENSE");
    },
    updateTransaction(state, action) {
      const newTransaction = action.payload;
      state.transactions.unshift(newTransaction);
      // Recalculate the total income and expense amounts
      state.totalIncomeAmount = calculateTotalAmount(
        state.transactions,
        "INCOME"
      );
      state.totalExpenseAmount = calculateTotalAmount(
        state.transactions,
        "EXPENSE"
      );
    },
    deleteTransaction(state, action) {
      state.transactions = [];
    },
    addRecentTransaction(state, action) {
      const transactions = action.payload;
      state.recentTransactions = transactions;
      // Recalculate the total income and expense amounts
      // state.totalIncomeAmount = calculateTotalAmount(transactions, "INCOME");
      // state.totalExpenseAmount = calculateTotalAmount(transactions, "EXPENSE");
    },
    updateRecentTransaction(state, action) {
      const newTransactions = action.payload;
      const transactions = state.transactions;
      if (transactions.length > 5) {
        state.recentTransactions.pop();
        state.recentTransactions.unshift(newTransactions);
      } else {
        state.recentTransactions.unshift(newTransactions);
      }
    },
  },
});

// Helper function to calculate total income or expense amount
function calculateTotalAmount(transactions, type) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
}
export const transactionActions = transactionSlice.actions;
export default transactionSlice;
