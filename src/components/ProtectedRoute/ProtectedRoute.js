import React from "react";
import { Redirect, Outlet } from "react-router-dom";

const ProtectedRoute = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Redirect to="/" />;
};

export default ProtectedRoute;