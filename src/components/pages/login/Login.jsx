import React, { useState } from "react";
import { textFields } from "../../../styles";
import { Link, useNavigate } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Grid,
  ThemeProvider,
  ButtonGroup,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  FormControl,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { emailPattern } from "../../../utils";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../copyright/Copyright";
import Header from "../../header/Header";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth-slice";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailHelperText, setEmailHelperText] = useState(""); // Helper text for email
  const [passwordHelperText, setPasswordHelperText] = useState(""); // Helper text for password
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (value.length < 5) {
        setIsPasswordValid(false);
        setPasswordHelperText("Password must be at least 5 characters long");
      } else {
        setIsPasswordValid(true);
        setPasswordHelperText("");
      }
    }
    setCredentials((credentials) => {
      return {
        ...credentials,
        [e.target.name]: e.target.value,
      };
    });
  };
  const styles = {
    signUpHeader: {
      display: "flex",
      flexDirection: { md: "row" },
    },
    textFields: {
      width: { xs: "10rem" },
    },
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const emailRegex = emailPattern;

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setIsEmailValid(false);
        setEmailHelperText("Invalid Email");
      } else {
        setIsEmailValid(true);
        setEmailHelperText("");
      }
    }
    if (name === "password") {
      if (value.length < 5) {
        setIsPasswordValid(false);
        setPasswordHelperText("Password must be at least 5 characters long");
      } else {
        setIsPasswordValid(true);
        setPasswordHelperText("");
      }
    }
  };

  //login functionality
  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/users/login`,
        data
      );

      return { success: true, data: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.response.data.message };
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    if (email.length === 0 || password.length === 0) {
      toast.error("Enter valid credentials.");
      return;
    } else {
      setLoader(true);
      try {
        const user = await loginUser(credentials);
        const userData = user.data;
        if (user.success) {
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(authActions.addUser(userData));
          toast.success("Logged in successfully");
          navigate("/dashboard");
          console.log(userData);
        } else {
          const error = user.error;
          toast.error(error);
        }
        setCredentials({
          email: "",
          password: "",
        });
        setLoader(false);
      } catch (error) {
        toast.error(`An error occurred`);
        setLoader(false);
        console.log(error);
      }
    }
  };
  return (
    <>
      <Header pageHeading="Login to Your Account"></Header>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5" color="#ab47bc">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box
            sx={{
              width: { md: "500px" },
            }}
            className="flex flex-col mx-7 w-64 sm:w-96"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={credentials.email}
              //  sx={styles.textFields}
              id="email"
              label="Email Address"
              name="email"
              // autoComplete="email"
              // autoFocus
              error={!isEmailValid}
              helperText={emailHelperText}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "purple", // Change label color on focus
                  },
                },
              }}
              sx={textFields}
            />
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={credentials.password}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                // autoComplete="current-password"
                helperText={passwordHelperText}
                error={!isPasswordValid}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "purple", // Change label color on focus
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    "&.Mui-focused": {
                      color: "purple", // Change label color on focus
                    },
                  },
                }}
                sx={textFields}
              />
            </FormControl>
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <LoadingButton
              type="submit"
              loading={loader}
              loadingPosition="start"
              startIcon={<LoginIcon />}
              variant="contained"
              // color="purple"
              sx={{
                mt: 3,
                mb: 2,
                color: "white",
                fontFamily: "Poppins",
                backgroundColor: "#ab47bc",
                fontWeight: "bold",
                borderColor: "#ba68c8", // Change border color on hover
                "&:hover": {
                  borderColor: "purple", // Change border color on hover
                  backgroundColor: "#7b1fa2",
                },
                "&:focus": {
                  borderColor: "purple", // Change border color on focus
                  outline: "1px solid #ab47bc", // Change outline color and width on focus
                  backgroundColor: "#ab47bc",
                },
              }} // className="border-purple-500 border-4"
            >
              Login
            </LoadingButton>
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> */}
            <Box
              className="flex justify-center"
              spacing={1}
              sx={{
                fontSize: { xs: "16px" },
                color: "#6a1b9a",
                textDecoration: "underline",
                fontFamily: "Poppins",
              }}
            >
              <Link
                to="/signup"
                variant="body2"
                sx={{ fontSize: { xs: "14px" }, color: "#ba68c8" }}
                // className="text-blue-500"
              >
                {"Don't have an account? Sign Up"}
              </Link>
              {/* </Grid> */}
            </Box>
          </Box>
        </Box>
      </Box>

      <Copyright sx={{ mt: 2 }} />
    </>
  );
};

export default Login;
