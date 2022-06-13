import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { isExpired } from "./auth-verify";
import { connect } from "react-redux";

const PrivateRoute = ({ loggedIn, redirectPath = "/login", allowedRoles }) => {
  if (!loggedIn || isExpired()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const mapStateToProps = (state) => {
  const { loggedIn } = state.userLogin;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
