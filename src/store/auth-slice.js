import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
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
export const authActions = authSlice.actions;
export default authSlice;
