import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Body from "./components/Body";
import Home from "./components/Home";
import Error from "./components/Error";
import Signup from "./components/Signup";



const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body /> }>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;