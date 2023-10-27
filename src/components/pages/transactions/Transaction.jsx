import React, { useEffect } from "react";
import TransactionsTable from "../../transactionTable/TransactionTable";
import { Typography } from "@mui/material";
import {  useSelector } from "react-redux";
const Transaction = () => {
  const user = useSelector((state) => state.auth.userData);
  const transactions = useSelector((state) => state.transaction.transactions);

  useEffect(() => {
    const userData = user?.user;
    const userId = userData?.id;
    // fetchTransactions(userId);
  }, []);
  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontFamily: "Poppins", m: 2, color: "purple" }}
      >
        Transaction Details
      </Typography>
      <TransactionsTable transactions={transactions}></TransactionsTable>
    </>
  );
};

export default Transaction;
