import React from "react";
import { Typography,Box,Container } from "@mui/material";
const Header = ({pageHeading}) => {
  return (
    <>
      <Container className="">
        <Box className="flex flex-col sm:flex-row items-center gap-5 sm:justify-around mt-10">
          <Box>
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", fontSize: { xs: "16px", sm: "30px" },fontFamily:'Poppins'}}
            >
              Expense Tracker App
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", fontSize: { xs: "12px", sm: "22px" },fontFamily:'Poppins' }}
            >
              {pageHeading}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Header;
