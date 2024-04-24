import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ROUTES } from "./routers";
import HomePage from "../pages/home-page/homePage";
import LoginPage from "../pages/login-page/loginPage";

function RouterCustom() {
  
  const ROUTES = {
    home: "/",
    login: "/login",
  };

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default RouterCustom;
