import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "@Context/authContext/authContext"

import HomePage from "@Pages/homePage/homePage";
import InterfacePage from "@Pages/interfacePage/interfacePage";
import LoginPage from "@Pages/loginPage/loginPage";
import RegisterPage from "@Pages/registerPage/registerPage";
import PersonalDataPage from "@Pages/personalDataPage/personalDataPage";

function RouterCustom() {
  
  const ROUTES = {
    home: "/",
    interface: "/interface/:project/:location/:photosphere",
    login: "/login",
    register: "/register",
    personalData: "/personalDataPolicy"
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.interface} element={<InterfacePage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path={ROUTES.personalData} element={<PersonalDataPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default RouterCustom;
