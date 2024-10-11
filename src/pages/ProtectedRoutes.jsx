import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


export const SafeRoute = () => {
    const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};



