import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Signup from "./components/Auth/Signup";

const AppLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <p>Welcome to ClassFlow!</p>
      <Outlet />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/sign-up" element={<Signup />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
);
