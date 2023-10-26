import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from ".";
import { categoryActions } from "./category-slice";
import { accountActions } from "./account-slice";
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

//fetching transactions from Database
export const fetchTransactions = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/transactions/find_all/${id}`
    );
    const data = response.data;
    const error = data.error;
    if (error) {
      throw error;
    } else {
      dispatch(transactionActions.addTransaction(data));
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

//adding transaction to the Database (income)

export const addTransaction = async (
  transactionData,
  categoryData,
  accountData
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/transactions/create`,
      transactionData
    );
    const data = response.data;
    console.log(data);
    const error = data?.error;
    console.log(error);
    if (error) {
      throw error;
    } else {
      //updating transactions
      dispatch(transactionActions.updateTransaction(data));
      //updating category data
      dispatch(categoryActions.updateCategoryAmount(categoryData));
      //updating account data
      dispatch(
        accountActions.updateAccountAmount({
          ...accountData,
          createdAt: data.createdAt,
        })
      );

      //updating recent transaction history
      dispatch(transactionActions.updateRecentTransaction(data));
      return { success: true, data: data };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};
