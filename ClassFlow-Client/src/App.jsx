import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Body from "./components/Body";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Error from "./components/Error";
import Signup from "./components/Signup";
import ViewAnswers from "./components/ViewAnswers";
import AskQuestion from "./components/AskQuestion";
import Answer from "./components/answer";
import Logout from "./components/Logout";
import Login from "./components/Login";


const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body /> }>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/view/answer" element={<ViewAnswers />}/>
          <Route path="/ask/question" element={<AskQuestion />}/>
          <Route path="/answer" element={<Answer />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;