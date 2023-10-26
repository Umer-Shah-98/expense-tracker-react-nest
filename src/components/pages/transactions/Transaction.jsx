import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionsTable from "../../transactionTable/TransactionTable";
import { transactionActions } from "../../../store/transaction-slice";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography } from "@mui/material";
const Transaction = () => {
  const user = useSelector((state) => state.auth.userData);
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();
  // console.log(transactions);
  // const fetchTransactions = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/transactions/find_all/${id}`
  //     );
  //     const data = response.data;
  //     const error = data.error;
  //     if (error) {
  //       throw error;
  //     } else {
  //       console.log(data);
  //       dispatch(transactionActions.addTransaction(data));
  //       return data;
  //     }
  //   } catch (error) {
  //     toast.error(`${error}`);
  //   }
  // };

  useEffect(() => {
    const userData = user?.user;
    const userId = userData?.id;
    // fetchTransactions(userId);
  }, []);
  return (
    <>
    <Typography variant="h4" align="center" sx={{fontFamily:'Poppins', m:2,color:'purple'}}>Transaction Details</Typography>
      <TransactionsTable transactions={transactions}></TransactionsTable>
    </>
  );
};

export default Transaction;
