import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";

const LandlordPrivateRoute = ({ user, redirectPath = "/unauthorized" }) => {
  if (user.user.role === "landlord") {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

const mapStateToProps = (state) => {
  const { user } = state.userLogin;
  return {
    user,
  };
};

export default connect(mapStateToProps)(LandlordPrivateRoute);
