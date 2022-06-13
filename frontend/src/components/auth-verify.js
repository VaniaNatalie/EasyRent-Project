import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authenticationService } from "../services/authentication.service";

const parseJwt = (token) => {
  try {
    const tokenData = token.split(".")[1];
    const decodedJWTToken = JSON.parse(atob(tokenData));
    return decodedJWTToken;
  } catch (e) {
    return null;
  }
};

export const isExpired = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const decodedJWT = parseJwt(user.accessToken);
    const dateNow = new Date();
    const milliseconds = dateNow.getTime() / 1000;
    if (decodedJWT.exp < milliseconds) {
      authenticationService.logout();
      return true;
    }
  }
};

const AuthWrapper = () => {
  return isExpired() ? <Navigate to="/login" replace /> : <Outlet />;
};

export default AuthWrapper;
