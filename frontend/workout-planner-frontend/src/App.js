import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Правильный путь и default import
import Login from "./components/Login";   // Правильный путь
import Register from "./components/Register";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/auth/token/login" element={<Login />} />
        <Route path="/auth/users" element={<Register />} />
        <Route path="/auth/token/logout" element={<Logout />} />
          <Route path="/auth/users/me" element={<Profile />} />
          <Route path="/auth/users/reset_password" element={<ResetPassword />} />
          <Route path="/auth/users/reset_password_confirm" element={<ResetPasswordConfirm />} />
      </Routes>
    </Router>
  );
}

export default App;
