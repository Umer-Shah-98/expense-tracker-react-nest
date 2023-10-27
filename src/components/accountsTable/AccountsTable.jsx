import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function AccountsTable({ accounts }) {
  if (!Array.isArray(accounts)) {
    // Loading state, you can customize the loading indicator
    return (
      <Typography variant="h3" align="center" sx={{ fontFamily: "Poppins" }}>
        Loading...
      </Typography>
    );
  }

  if (accounts.length === 0) {
    // No accounts found
    return (
      <Typography
        variant="h3"
        align="center"
        sx={{ fontFamily: "Poppins", height: "200px", color: "red" }}
      >
        No accounts found
      </Typography>
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const totalAccounts = accounts.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedAccounts = accounts.slice(startIndex, endIndex);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Account Name</StyledTableCell>
            <StyledTableCell align="right">Balance</StyledTableCell>
            <StyledTableCell align="right">Updated At</StyledTableCell>
            {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedAccounts.map((account) => {
            const date = new Date(account.updatedAt).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true, // Use AM/PM
            });
            return (
              <StyledTableRow key={account._id}>
                <StyledTableCell component="th" scope="row">
                  {account.accountName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {account?.balance.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="right">{date}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      {totalAccounts > 3 && (
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            { value: totalAccounts, label: "All" },
          ]}
          component="div"
          count={totalAccounts}
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
