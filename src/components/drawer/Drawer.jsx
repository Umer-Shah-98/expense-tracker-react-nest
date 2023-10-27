import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaidIcon from "@mui/icons-material/Paid";
import Dashboard from "../pages/dashboard/Dashboard";
import Accounts from "../pages/accounts/Accounts";
import Transaction from "../pages/transactions/Transaction";
import { useDispatch } from "react-redux";
import { Footer } from "../footer/Footer";
import { logoutUser } from "../../store/auth-slice";
const drawerWidth = 170;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MyDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "purple" }}>
        <Toolbar sx={{ displayL: "flex" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            {menuData}
          </Typography>
          <Button
            endIcon={<LogoutIcon />}
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "#6d0c6d",
              },
            }}
            onClick={handleLogout}
          >
            <Typography sx={{ fontSize: "12px", fontFamily: "Poppins" }}>
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          //   ...(open && { backgroundColor: "red" }),
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "purple",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: "purple" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <IconButton
          variant="text"
          sx={{
            mt: "10px",

            backgroundColor: "purple",
            borderRadius: "5px",

            "&:hover": {
              backgroundColor: "#6d0c6d",
              borderRadius: "5px",
            },
            "&:focus": {
              backgroundColor: "#991a99",
              borderRadius: "5px",
            },
          }}
          onClick={() => {
            setMenuData("Dashboard");
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <SpaceDashboardIcon sx={{ color: "white" }} />
            <Typography
              variant="body1"
              color="white"
              align="left"
              sx={{ ml: 2, fontFamily: "Poppins" }}
            >
              Dashboard
            </Typography>
          </Box>
        </IconButton>
        <IconButton
          variant="text"
          sx={{
            mt: "10px",

            backgroundColor: "purple",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#6d0c6d",
              borderRadius: "5px",
            },
            "&:focus": {
              backgroundColor: "#991a99",
            },
          }}
          onClick={() => {
            setMenuData("Accounts");
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <AccountBalanceIcon sx={{ color: "white", mr: 4 }} />
            <Typography
              variant="body1"
              color="white"
              align="left"
              sx={{ fontFamily: "Poppins" }}
            >
              Accounts
            </Typography>
          </Box>
        </IconButton>
        <IconButton
          variant="text"
          sx={{
            mt: "10px",

            backgroundColor: "purple",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#6d0c6d",
              borderRadius: "5px",
            },
            "&:focus": {
              backgroundColor: "#991a99",
            },
          }}
          onClick={() => {
            setMenuData("Transactions");
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <PaidIcon sx={{ color: "white" }} />
            <Typography
              variant="body1"
              color="white"
              align="left"
              sx={{ ml: 2, fontFamily: "Poppins" }}
            >
              Transactions
            </Typography>
          </Box>
        </IconButton>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box component="main">
          {menuData === "Dashboard" && <Dashboard />}
          {menuData === "Accounts" && <Accounts />}
          {menuData === "Transactions" && <Transaction />}
          <Footer></Footer>
        </Box>
      </Main>
    </Box>
  );
}
