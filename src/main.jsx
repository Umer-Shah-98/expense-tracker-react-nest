import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import store from "./store/index.js";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import App from "./App.jsx";
import "./index.css";
import Layout from "./components/layout/Layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      {/* <Layout> */}
        <App />
      {/* </Layout> */}
    </Provider>
  </React.StrictMode>
);
