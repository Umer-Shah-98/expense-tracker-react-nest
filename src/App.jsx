import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/pages/signup/SignUp";
import Login from "./components/pages/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import Dashboard from "./components/pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <div>
      {/* <SignUp></SignUp>
      <Login></Login> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Layout />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <CssBaseline />
    </div>
  );
}

export default App;
