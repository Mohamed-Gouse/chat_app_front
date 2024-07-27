import React, { useState } from "react";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";

const App = () => {
  const { isLogged } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={isLogged ? <ChatPage /> : <Navigate to={'/'} />} />
        <Route path="/Signin" element={<SignInPage />} />
        <Route path="/Signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
