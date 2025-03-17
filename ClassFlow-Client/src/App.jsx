import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Error from "./components/Error";
import Signup from "./components/Signup";
import NewQuestion from "./components/NewQuestion";
import SubmitAnswer from "./components/SubmitAnswer";
import ViewQA from "./components/ViewQA";
import ProfileEdit from "./components/ProfileEdit";
import Logout from "./components/Logout";
import Login from "./components/Login";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/new/question" element={<NewQuestion />} />
            <Route path="/answer/submit" element={<SubmitAnswer />} />
            <Route path="/question/:quesCode" element={<ViewQA />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
