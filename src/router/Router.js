import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "@Pages/home-page/homePage";
import LoginPage from "@Pages/login-page/loginPage";
import RegisterPage from "@Pages/register-page/registerPage";

function RouterCustom() {
  
  const ROUTES = {
    home: "/",
    login: "/login",
    register: "/register"
  };

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default RouterCustom;
