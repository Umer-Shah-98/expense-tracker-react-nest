import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#971997",
    color: theme.palette.common.white,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export default function TransactionsTable({ transactions }) {
  if (!Array.isArray(transactions)) {
    // Loading state, you can customize the loading indicator
    return (
      <Typography variant="h3" align="center" sx={{ fontFamily: "Poppins" }}>
        Loading...
      </Typography>
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const totalTransactions = transactions.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedTransactions = transactions.slice(startIndex, endIndex);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ position: "static" }}>
            <StyledTableCell>Account</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Transaction At</StyledTableCell>
          </TableRow>
        </TableHead>
        {displayedTransactions.length > 0 ? (
          <TableBody>
            {displayedTransactions.map((transaction) => {
              const date = new Date(transaction.createdAt).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true, // Use AM/PM
                }
              );
              return (
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
              );
            })}
          </TableBody>
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
      </Table>
      {totalTransactions > 4 && (
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            { value: totalTransactions, label: "All" },
          ]}
          component="div"
          count={totalTransactions}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="flex justify-center"
          // sx={{
          //   margin: "auto", // Center-align the TablePagination component
          // }}
        />
      )}
    </TableContainer>
  );
}
