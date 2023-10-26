import { Button, ButtonGroup, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import IncomeForm from "../incomeForm/IncomeForm";
import ExpenseForm from "../expenseForm/ExpenseForm";

const TransactionForm = () => {
  const [form, setForm] = useState("income");
  return (
    <>
      <ButtonGroup sx={{ width: { xs: "645px" }, borderCollapse: "collapse" }}>
        <Button
          disableElevation
          sx={{
            width: { xs: "322px" },
            backgroundColor: "#ff000063",
            color: "#cb2020",
            "&:hover": {
              backgroundColor: "#d5b1f0",
            },
            borderCollapse: "collapse",
          }}
          onClick={() => setForm("expense")}
          variant="contained"
        >
          <Typography
            variant="body1"
            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}
          >
            Expense
          </Typography>
        </Button>
        <Button
          disableElevation
          sx={{
            width: { xs: "322px" },
            backgroundColor: "#0080006b",
            color: "#078d07",
            "&:hover": {
              backgroundColor: "#d5b1f0",
            },
            borderCollapse: "collapse",
          }}
          onClick={() => setForm("income")}
          variant="contained"
        >
          <Typography
            variant="body1"
            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}
          >
            Income
          </Typography>
        </Button>
      </ButtonGroup>
      <Box>
        {form === "income" && <IncomeForm />}
        {form === "expense" && <ExpenseForm />}
      </Box>
    </>
  );
};

export default TransactionForm;
