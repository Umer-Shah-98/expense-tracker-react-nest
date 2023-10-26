import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableFooter, Typography } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    fontSize: 10,
    backgroundColor: "#971997",
    color: theme.palette.common.white,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "10px",
    fontFamily: "Poppins",
    fontWeight: "medium",
    color: "purple",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function RecentTransactionsTable({ transactions }) {
  if (!Array.isArray(transactions)) {
    // Loading state, you can customize the loading indicator
    return (
      <Typography variant="h3" align="center" sx={{ fontFamily: "Poppins" }}>
        Loading...
      </Typography>
    );
  }

  // if (transactions.length === 0) {
  //   // No accounts found
  //   return (
  //     <Typography
  //       variant="h5"
  //       align="center"
  //       sx={{ fontFamily: "Poppins", color: "red" }}
  //     >
  //       No transactions found
  //     </Typography>
  //   );
  // }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ position: "static" }}>
            <StyledTableCell>Account</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Transaction At</StyledTableCell>
          </TableRow>
        </TableHead>
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
            const date = new Date(transaction.createdAt).toLocaleString(
              "en-US",
              {
                month: "2-digit", // Two-digit month (e.g., 01, 02, ...)
                day: "2-digit", // Two-digit day (e.g., 01, 02, ...)
                year: "numeric", // Full year (e.g., 2023)
                hour: "2-digit", // Two-digit hour (e.g., 01, 02, ...), or "numeric" for 1-digit
                minute: "2-digit", // Two-digit minute (e.g., 01, 02, ...)
                hour12: true, // Use AM/PM
              }
            );
            return (
              <TableBody key={transaction._id}>
                <StyledTableRow key={transaction._id} type={transaction.type}>
                  <StyledTableCell component="th" scope="row">
                    {transaction.accountName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {transaction.categoryName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {transaction.type === "INCOME"
                      ? transaction.amount.toFixed(2)
                      : `-${transaction.amount}`}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{
                      color:
                        transaction.type === "INCOME" ? "green" : "#FF0000",
                    }}
                  >
                    {transaction.type}
                  </StyledTableCell>
                  <StyledTableCell align="right">{date}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            );
          })
        ) : (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ fontFamily: "Poppins", color: "red" }}
                >
                  No transactions found
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
        {}
        {/* </TableBody> */}
      </Table>
    </TableContainer>
  );
}
