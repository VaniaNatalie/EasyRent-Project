import Navbar from "./Navbar";
import React from "react";
import NavbarOwners from "./NavbarOwners";
import NavbarRenters from "./NavbarRenters";
import NavbarAdmin from "./NavbarAdmin";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import { useSelector } from "react-redux";

// import { authenticationService } from "../services/authentication.service";

function NavLayout() {
  // const currentUser = authenticationService.getCurrentUser();
  const userLogin = useSelector((state) => state.userLogin);
  const { loggedIn, user } = userLogin;

  return (
    <div>
      {(() => {
        if (loggedIn) {
          console.log(loggedIn);
          if (user.user.role === "admin") {
            return <NavbarAdmin />;
          }
          if (user.user.role === "landlord") {
            return <NavbarOwners />;
          }
          if (user.user.role === "tenant") {
            return <NavbarRenters />;
          }
        } else {
          return <Navbar />;
        }
      })()}
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default NavLayout;
