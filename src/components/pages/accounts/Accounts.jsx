import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AccountsTable from "../../accountsTable/AccountsTable";
import AddAccountForm from "../../addAccountForm/AddAccountForm";

const Accounts = () => {
  const accounts = useSelector((state) => state.account.accounts);

  return (
    <>
      <Box className="accounts-page">
        <Box>
          <AddAccountForm></AddAccountForm>
        </Box>
        <Box className="m-5">
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "medium",
              color: "purple",
            }}
          >
            Accounts Details
          </Typography>
        </Box>
        <AccountsTable accounts={accounts}></AccountsTable>
      </Box>
    </>
  );
};

export default Accounts;
