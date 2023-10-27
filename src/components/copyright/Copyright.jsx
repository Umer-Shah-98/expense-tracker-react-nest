import React from "react";
import { Typography, Link } from "@mui/material";
export const Copyright = (props) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
     
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ fontFamily: "Poppins" }}
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="#" sx={{ fontFamily: "inherit" }}>
          Expensify
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
};

export default Copyright;
