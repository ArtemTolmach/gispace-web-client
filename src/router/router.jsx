import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "@Context/authContext/authContext"

import HomePage from "@Pages/homePage/homePage";
import InterfacePage from "@Pages/interfacePage/interfacePage";
import LoginPage from "@Pages/loginPage/loginPage";
import RegisterPage from "@Pages/registerPage/registerPage";

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
