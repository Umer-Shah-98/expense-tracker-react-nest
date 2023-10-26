import React from "react";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";

import MyDrawer from "../drawer/Drawer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Layout = ({ children }) => {
  const user = useSelector((state) => state.auth.userData);

  return (
    <>
      {user ? (
        <MyDrawer></MyDrawer>
      ) : (
        <Box className="flex justify-center items-center">
          <Box className="flex flex-col items-center justify-center">
            <Typography
              variant="h2"
              align="center"
              sx={{ fontFamily: "Poppins", mt: 5 }}
            >
              Log in first
            </Typography>
            <Link className="mt-5" to="/login">
              <Button
                variant="contained"
                sx={{
                  fontSize: "14px",
                  // mb: 2,
                  py: 2,
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
                Login
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Layout;
