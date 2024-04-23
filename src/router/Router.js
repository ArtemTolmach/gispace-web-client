import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ROUTES } from "./routers";
import HomePage from "../pages/home-page/homePage";

function RouterCustom() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default RouterCustom;
