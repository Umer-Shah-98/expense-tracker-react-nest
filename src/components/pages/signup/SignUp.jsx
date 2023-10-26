import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailPattern } from "../../../utils/index.js";
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
} from "@mui/material";
import { textFields } from "../../../styles/index.js";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../copyright/Copyright";
import Header from "../../header/Header";
import axios from "axios";
import { toast } from "react-toastify";
const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [usernameHelperText, setUsernameHelperText] = useState(""); // Helper text for username
  const [emailHelperText, setEmailHelperText] = useState(""); // Helper text for email
  const [passwordHelperText, setPasswordHelperText] = useState(""); // Helper text for password
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
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
    if (name === "username") {
      console.log("lo");
      if (value.length < 3) {
        setIsUsernameValid(false);
        setUsernameHelperText("Username must be at least 4 characters");
      } else {
        setIsUsernameValid(true);
        setUsernameHelperText("");
      }
    }
    if (name === "email") {
      console.log("li");
      if (!emailRegex.test(value)) {
        console.log("ui");
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
  const createAccount = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/users/create`,
        data
      );
      if (response.data.error) {
        return { success: false, error: response.data.error };
      } else {
        console.log(response.data);

        return { success: true, data: response.data };
      }
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = credentials;
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      return;
    } else {
      setLoader(true);
      console.log(credentials);
      try {
        const user = await createAccount(credentials);
        if (!user.success) {
          throw Error(user.error);
        } else {
          toast.success("SignUp is successful");
          navigate("/login");
          console.log(user.data);
          setCredentials({
            username: "",
            email: "",
            password: "",
          });
        }
      } catch (error) {
        setLoader(false);
        toast.error(`${error}`);
        console.log(error);
      }

      setLoader(false);
    }
  };
  return (
    <>
      <Header pageHeading="Create an Account"></Header>
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
          Sign Up
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={credentials.username}
              //   autoFocus
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "purple", // Change label color on focus
                  },
                },
              }}
              sx={textFields}
              error={!isUsernameValid}
              helperText={usernameHelperText}
            />
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
              autoComplete="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={credentials.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={passwordHelperText}
              error={!isPasswordValid}
              InputLabelProps={{
                sx: {
                  "&.Mui-focused": {
                    color: "purple", // Change label color on focus
                  },
                },
              }}
              sx={textFields}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <LoadingButton
              type="submit"
              loading={loader}
              loadingPosition="start"
              startIcon={<SaveIcon />}
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
              Sign Up
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
                to="/login"
                variant="body2"
                sx={{ fontSize: { xs: "14px" }, color: "#ba68c8" }}
                // className="text-blue-500"
              >
                {"Already have an account? Login"}
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

export default SignUp;
