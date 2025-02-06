import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login"; 
import SignUp from "./SignUp"; 
import './index.css';
import FilteredRides from "./FilteredRides";
import RideDetails from "./RideDetails"; 
import Success from "./payment_success";  // Import the Success page

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/FilteredRides" element={<FilteredRides />} />
        <Route path="/RideDetails" element={<RideDetails />} />
        <Route path="/Success" element={<Success />} />  {/* ✅ Add this route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
