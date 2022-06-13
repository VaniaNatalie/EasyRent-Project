import "./App.css";
import GlobalStyle from "./GlobalStyles";
import NavLayout from "./components/NavLayout";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import SignUpRenters from "./components/SignUpRenters/SignUpRenters";
import SignUpOwners from "./components/SignUpOwners/SignUpOwners";
import Home from "./pages/HomePage/Home";
import AboutUs from "./pages/AboutUsPage/AboutUs";
import ContactUs from "./pages/ContactUsPage/ContactUs";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AccountPage from "./pages/Account/AccountPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import AddProperties from "./pages/AddProperties/AddProperties";
import Verifying from "./components/VerifyLandlordSection/Verifying";
import PrivateRoute from "./components/PrivateRoute";
import { FormAddProperty } from "./components";
import ListingSection from "./components/ListingSection/ListingSection";
import TenantExploreSection from "./components/TenantExploreSection/TenantExploreSection";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import SingleListingView from "./components/SingleListingView/SingleLisitngView";
import PurchaseSection from "./components/PurchaseSection/PurchaseSection";
import UsersSection from "./components/UsersSection/UsersSection";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import TenantPrivateRoute from "./components/TenantPrivateRoute";
import LandlordPrivateRoute from "./components/LandlordPrivateRoute";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" exact element={<Home />} />
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<NavLayout />}>
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/account" element={<AccountPage />} />
              <Route element={<LandlordPrivateRoute />}>
                <Route path="/verify" element={<Verifying />} />
                <Route path="/your-properties" element={<AddProperties />} />
                <Route
                  path="/your-properties/:id"
                  element={<ListingSection />}
                />
                <Route path="/add-properties" element={<FormAddProperty />} />
              </Route>
              <Route element={<TenantPrivateRoute />}>
                <Route path="/explore" element={<TenantExploreSection />} />
                <Route path="/explore/:id" element={<SingleListingView />} />
                <Route path="/favorites" element={<FavoriteList />} />
                <Route path="/checkout/:id" element={<PurchaseSection />} />
              </Route>
              <Route element={<AdminPrivateRoute />}>
                <Route path="/users" element={<UsersSection />} />
              </Route>
            </Route>
          </Route>
          {/* Public Routes */}

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/renter" element={<SignUpRenters />} />
          <Route path="/signup/owner" element={<SignUpOwners />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/account/changePassword" element={<ChangePassword />} />
          <Route
            path="/resetPassword/:userId/:token"
            element={<ResetPassword />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
