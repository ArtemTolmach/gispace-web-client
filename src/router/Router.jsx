import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "@Pages/home-page/homePage";
import InterfacePage from "@Pages/interface-page/interfacePage";
import LoginPage from "@Pages/login-page/loginPage";
import RegisterPage from "@Pages/register-page/registerPage";
import { AuthProvider } from "../context/AuthContext"

function RouterCustom() {
  
  const ROUTES = {
    home: "/",
    login: "/login",
    register: "/register"
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path="/interface/:project/:location/:photosphere" element={<InterfacePage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default RouterCustom;
