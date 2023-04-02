import React from "react";
import "./global.scss";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Home from "./pages/home/home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<h2>Page not found...</h2>} />
    </Routes>
  );
};

export default App;
