import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailPattern } from "../../../utils/index.js";
import { createAccount } from "../../../store/auth-slice.js";
import { Box, Typography, Avatar, TextField } from "@mui/material";
import { textFields } from "../../../styles/index.js";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Copyright from "../../copyright/Copyright";
import Header from "../../header/Header";
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
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (value.length < 6) {
        setIsPasswordValid(false);
        setPasswordHelperText("Password must be at least 6 characters long");
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
      if (value.length < 3) {
        setIsUsernameValid(false);
        setUsernameHelperText("Username must be at least 3 characters");
      } else {
        setIsUsernameValid(true);
        setUsernameHelperText("");
      }
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = credentials;
    if (email === "") {
      setIsEmailValid(false);
      setEmailHelperText("Invalid Email");
      return;
    }
    if (username === "") {
      setIsUsernameValid(false);
      setUsernameHelperText("Type Username");
      return;
    }
    if (password === "") {
      setIsPasswordValid(false);
      setPasswordHelperText("Set your password");
      return;
    }
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      return;
    } else {
      setLoader(true);
      try {
        const user = await createAccount(credentials);
        if (!user.success) {
          throw Error(user.error);
        } else {
          toast.success("SignUp is successful");
          navigate("/login");
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
              type={showPassword ? "text" : "password"} // Toggle password visibility
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
                className="text-xs md:text-sm"
              >
                {"Already have an account? Login"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2 }} />
    </>
  );
};

export default SignUp;
