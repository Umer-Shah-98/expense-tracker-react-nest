import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { textFields } from "../../styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { accountActions } from "../../store/account-slice";
import { createBankAccount } from "../../store/account-slice";
const AddAccountForm = () => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const userId = userData?.id;
  const dispatch = useDispatch();
  const [accountDetails, setAccountDetails] = useState({
    userId: userId,
    accountName: "",
    balance: "",
  });
  const [isAccountNameValid, setIsAccountNameValid] = useState(true);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [accountHelperText, setAccountHelperText] = useState("");
  const [amountHelperText, setAmountHelperText] = useState("");
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    setAccountDetails({
      ...accountDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleAmountBlur = (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0) {
      // If the entered value is negative, set it to 0
      setAccountDetails({
        ...accountDetails,
        balance: 0,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { accountName, balance } = accountDetails;

    if (accountName === undefined || accountName.length < 3) {
      setIsAccountNameValid(false);
      setAccountHelperText("Must be at least three characters");
      return;
    }
    if (balance === undefined || balance <= 0) {
      setIsAmountValid(false);
      setAmountHelperText("Enter valid amount");
      return;
    } else {
      setIsAccountNameValid(true);
      setIsAmountValid(true);
      setAccountHelperText("");
      setAmountHelperText("");
      try {
        setLoader(true);
        const accountData = {
          ...accountDetails,
          balance: parseFloat(balance),
          accountName: accountName.toUpperCase(),
        };
        const newAccount = await createBankAccount(accountData);
        if (!newAccount.success) {
          throw Error(newAccount.error);
        } else {
          toast.success("Account is added successfully");
          setAccountDetails({
            ...accountDetails,
            accountName: "",
            balance: "",
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
      <Box>
        <Typography
          variant="h5"
          align="center"
          sx={{ fontFamily: "Poppins", fontWeight: "medium", color: "purple" }}
        >
          Add Account
        </Typography>
      </Box>
      <Box className="flex justify-center">
        <Box
          component="form"
          className="flex flex-col sm:flex-row items-center gap-5 mt-3"
          onSubmit={handleSubmit}
        >
          <FormControl sx={{ width: { xs: "180px" } }}>
            <TextField
              margin="normal"
              required
              size="small"
              type="text"
              fullWidth
              // onBlur={handleBlur}
              onChange={handleChange}
              value={accountDetails.accountName}
              //  sx={styles.textFields}
              id="account"
              label="Type Account Name"
              name="accountName"
              autoComplete="account"
              // autoFocus
              error={!isAccountNameValid}
              helperText={accountHelperText}
              InputLabelProps={{
                sx: {
                  fontSize: "12px",
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
          <FormControl sx={{ width: { xs: "180px" } }}>
            <TextField
              margin="normal"
              required
              size="small"
              type="number"
              fullWidth
              onBlur={handleAmountBlur}
              onChange={handleChange}
              value={accountDetails.balance}
              //  sx={styles.textFields}
              id="amount"
              label="Enter Amount"
              name="balance"
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
          </FormControl>
          <FormControl>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loader}
              sx={{
                fontSize: "10px",
                // mb: 2,
                py: 1,
                fontWeight: "bold",
                width: { xs: "120px" },
                backgroundColor: "rgb(209,213,219)",
                color: "purple",
                "&:hover": {
                  backgroundColor: "purple",
                  color: "white",
                },
                borderCollapse: "collapse",
              }}
            >
              Add Account
            </LoadingButton>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default AddAccountForm;
