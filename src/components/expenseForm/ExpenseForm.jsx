import React, { useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { textFields } from "../../styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { transactionActions } from "../../store/transaction-slice";
import LoadingButton from "@mui/lab/LoadingButton";
import { categoryActions } from "../../store/category-slice";
import { accountActions } from "../../store/account-slice";
import { addTransaction } from "../../store/transaction-slice";

const ExpenseForm = () => {
  const accounts = useSelector((state) => state.account.accounts);
  const categories = useSelector((state) => state.category.categories);
  const transactions = useSelector((state) => state.transaction.transactions);
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const userId = userData?.id;

  const [transactionDetails, setTransactionDetails] = useState({
    amount: "",
    categoryId: "",
    accountId: "",
    type: "EXPENSE",
    accountName: "",
    categoryName: "",
    userId: userId,
  });
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isBankValid, setIsBankValid] = useState(true);
  const [isCategoryValid, setIsCategoryValid] = useState(true);
  const [amountHelperText, setAmountHelperText] = useState(""); // Helper text for username
  const [bankHelperText, setBankHelperText] = useState(""); // Helper text for email
  const [categoryHelperText, setCategoryHelperText] = useState(""); // Helper text for password
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleBlur = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input

    if (name === "account") {
      const selectedAccount = accounts.find(
        (account) => account.accountName === value
      );
      if (selectedAccount) {
        setTransactionDetails({
          ...transactionDetails,
          accountId: selectedAccount._id,
          accountName: value,
        });
      }
    } else if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category.categoryName === value
      );
      if (selectedCategory) {
        setTransactionDetails({
          ...transactionDetails,
          categoryId: selectedCategory._id,
          categoryName: value,
        });
      }
    } else {
      // For other inputs (not "account" or "category"), update the state normally
      setTransactionDetails({
        ...transactionDetails,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, accountName, categoryName, categoryId, type, accountId } =
      transactionDetails;

    if (!amount || amount <= 0) {
      setIsAmountValid(false);
      setAmountHelperText("Enter a valid amount");
      return;
    } else {
      setIsAmountValid(true);
      setAmountHelperText("");
    }

    if (!accountName) {
      setIsBankValid(false);
      setBankHelperText("Select a bank account");
      return;
    } else {
      setIsBankValid(true);
      setBankHelperText("");
    }

    if (!categoryName) {
      setIsCategoryValid(false);
      setCategoryHelperText("Select a category");
      return;
    } else {
      setIsCategoryValid(true);
      setCategoryHelperText("");
    }

    if (amount && accountName && categoryName) {
      try {
        setLoader(true);
        const transactionData = {
          ...transactionDetails,
          amount: parseFloat(amount),
        };
        const categoryData = {
          type,
          amount: parseFloat(amount),
          categoryId,
        };

        const accountData = {
          type,
          amount: parseFloat(amount),
          accountId,
          // createdAt: data.createdAt, this must be updated at store in transaction-slice file
        };
        const newTransaction = await addTransaction(
          transactionData,
          categoryData,
          accountData
        );
        if (!newTransaction.success) {
          throw Error(newTransaction.error);
        } else {
          toast.success("Transaction is successful");
          setTransactionDetails({
            ...transactionDetails,
            categoryName: "",
            accountName: "",
            amount: "",
          });
        }
        setLoader(false);
      } catch (error) {
        console.log(error);

        toast.error(`${error}`);
        setLoader(false);
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        className="flex items-center gap-5 mt-3"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ width: { xs: "140px" } }}>
          <TextField
            margin="normal"
            required
            size="small"
            type="number"
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={transactionDetails.amount}
            //  sx={styles.textFields}
            id="amount"
            label="Enter Amount"
            name="amount"
            autoComplete="amount"
            // autoFocus
            error={!isAmountValid}
            helperText={amountHelperText}
            InputLabelProps={{
              sx: {
                fontSize: "14px",
                fontFamily: "Poppins",
                "&.Mui-focused": {
                  color: "purple", // Change label color on focus
                },
              },
            }}
            sx={textFields}
          />{" "}
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <FormControl
          sx={[{ mt: 1, width: { xs: "160px" } }, textFields]}
          size="small"
        >
          <InputLabel
            sx={{
              fontSize: "14px",
              fontFamily: "Poppins",
              "&.Mui-focused": {
                color: "purple", // Change label color on focus
              },
            }}
            id="demo-select-small-label"
          >
            Select Bank
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={transactionDetails.accountName}
            name="account"
            label="Select Bank"
            onChange={handleChange}
            sx={textFields}
            required
            error={!isBankValid}
            // helperText={bankHelperText}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {accounts.map((account) => (
              <MenuItem
                sx={{ fontSize: "14px" }}
                key={account._id}
                data-id={account._id}
                value={account.accountName}
                // name="account"
              >
                {account.accountName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "red", fontStyle: "medium" }}>
            {!isBankValid && bankHelperText}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={[{ mt: 1, width: { xs: "160px" } }, textFields]}
          size="small"
        >
          <InputLabel
            sx={{
              fontSize: "14px",
              fontFamily: "Poppins",
              "&.Mui-focused": {
                color: "purple", // Change label color on focus
              },
            }}
            id="demo-select-small-label"
          >
            Select Category
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            required
            value={transactionDetails.categoryName}
            name="category"
            label="Select Category"
            onChange={handleChange}
            sx={textFields}
            error={!isCategoryValid}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {categories.map((category) => (
              <MenuItem
                sx={{ fontSize: "14px" }}
                key={category._id}
                data-id={category._id}
                value={category.categoryName}
                // name="account"
              >
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {!isCategoryValid && categoryHelperText}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loader}
            sx={{
              fontSize: "11px",
              // mb: 2,
              width: { xs: "120px" },
              backgroundColor: "#ff000063",
              color: "#cb2020",
              "&:hover": {
                backgroundColor: "#d5b1f0",
              },
              borderCollapse: "collapse",
            }}
          >
            Add Expense
          </LoadingButton>
        </FormControl>
      </Box>
    </>
  );
};

export default ExpenseForm;
