import { createSlice } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch } from "react-redux";
import { dispatch } from "./index.js";
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
const baseURL = "https://defiant-galoshes-lion.cyclic.app/";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: user,
  },
  reducers: {
    addUser(state, action) {
      const user = action.payload;
      state.userData = user;
    },
    updateUser(state, action) {},
    deleteUser(state, action) {
      state.userData = {};
    },
  },
});

//actions and slice
export const authActions = authSlice.actions;
export default authSlice;

// signuUp functionality
export const createAccount = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/users/create`,
      data
    );
    if (response?.data?.error) {
      return { success: false, error: response.data.error };
    } else {
      console.log(response.data);

      return { success: true, data: response.data };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

//login functionality
export const loginUser = async (data) => {
  console.log("login fn");
  // const dispatch = useDispatch();
  try {
    const response = await axios.post(`${baseURL}users/login`, data);
    const user = response?.data;
    localStorage.setItem("user", JSON.stringify(user));
    console.log("auth-slice");
    dispatch(authActions.addUser(user));
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.response.data.message };
  }
};

//logout functionality
export const logoutUser = () => {
  localStorage.removeItem("user");
  dispatch(authActions.deleteUser());
  // navigate("/login");
};
