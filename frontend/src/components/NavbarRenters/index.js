import { React, useState, useEffect, useRef, useLayoutEffect } from "react";
import AccountIcon from "@mui/icons-material/AccountCircleRounded";
import "../Navbar/Navbar.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../images/easyrent_logo.png";
import { animateScroll as scroll } from "react-scroll";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/StarRounded";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

import {
  Nav,
  NavContainer,
  NavLogo,
  NavItem,
  BrandTitle,
  SidebarMenu,
  SidebarItem,
  SideMenu,
} from "../Navbar/Navbar.elements";

import {
  NavAccItem,
  NavRightMenu,
  NavAccountItem,
  NavLink,
  NavFavouriteItem,
} from "../NavbarOwners/NavbarOwners.elements";

import {
  SidebarLink,
  NavMenu,
  NavMenuLink,
  SidebarAccCard,
  SidebarCardDetail,
  AccName,
  SidebarIcon,
  SideLink,
} from "../NavbarAdmin/NavbarAdmin.elements";

const NavbarRenters = () => {
  const [navChangeColor, setNavChangeColor] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
        setNavChangeColor(true);
      } else {
        setNavChangeColor(false);
      }
    };

    window.addEventListener("scroll", changeNavbarColor);
    return () => {
      window.addEventListener("scroll", changeNavbarColor);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1065) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setMobile(false);
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSidebar(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleToggleHome = () => {
    scroll.scrollToTop();
    setSidebar(false);
  };

  useLayoutEffect(() => {
    if (sidebar) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
    if (!sidebar) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [sidebar]);

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className={`overlay ${sidebar ? "visible" : ""}`} />
      <Nav className={navChangeColor ? "navbar active" : "navbar"}>
        <NavContainer>
          <NavLogo to="/" onClick={handleToggleHome}>
            <img src={logo} alt="EasyRent Logo" width="38" height="33" />
            <BrandTitle>EasyRent</BrandTitle>
          </NavLogo>
          {!mobile && (
            <>
              <NavMenu>
                <NavItem>
                  <NavLink offset={-50} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink offset={-50} to="/explore">
                    Explore
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink offset={-50} to="/aboutus">
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink offset={-50} to="/contactus">
                    Contact Us
                  </NavLink>
                </NavItem>
              </NavMenu>
              <NavRightMenu>
                <NavFavouriteItem>
                  <Link to="/favorites">
                    <StarIcon sx={{ fontSize: "30px", color: "#FFB443" }} />
                  </Link>
                </NavFavouriteItem>
                <NavAccountItem>
                  <Tooltip title="Account">
                    <IconButton
                      onClick={handleClickAnchor}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <AccountIcon
                        sx={{ fontSize: "40px", color: "#2bc66a" }}
                      />
                    </IconButton>
                  </Tooltip>
                </NavAccountItem>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <NavMenuLink to="/account">
                      <ListItemIcon>
                        <Avatar fontSize="small" />
                      </ListItemIcon>
                      My account
                    </NavMenuLink>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <NavMenuLink to="/login" onClick={logOut}>
                      <ListItemIcon>
                        <Logout fontSize="medium" />
                      </ListItemIcon>
                      Logout
                    </NavMenuLink>
                  </MenuItem>
                </Menu>
              </NavRightMenu>
            </>
          )}
          {mobile && (
            <div className="sidebar-toggle">
              <FaBars
                className="sidebar-logo-toggle"
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
          )}
        </NavContainer>
      </Nav>

      <div ref={ref} className={sidebar ? "sidebar active" : "sidebar"}>
        {mobile && (
          <div className="sidebar-toggle">
            <FaTimes
              className="sidebar-logo-toggle"
              onClick={() => setSidebar(!sidebar)}
            />
          </div>
        )}
        <SidebarMenu>
          <SidebarItem>
            <SideLink to="/account" onClick={() => setSidebar(false)}>
              <SidebarAccCard>
                <SidebarCardDetail>
                  <SidebarIcon>
                    <AccountIcon sx={{ fontSize: "40px", color: "#2bc66a" }} />
                  </SidebarIcon>
                  <AccName>{user.user.fullname}</AccName>
                </SidebarCardDetail>
              </SidebarAccCard>
            </SideLink>
          </SidebarItem>
          <Divider style={{ width: "90%" }} />
          <SidebarItem>
            <SidebarLink to="/" onClick={() => setSidebar(false)}>
              <HomeIcon style={{ color: "black", marginRight: "0.7rem" }} />
              Home
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/explore" onClick={() => setSidebar(false)}>
              <ExploreIcon style={{ color: "black", marginRight: "0.7rem" }} />
              Explore
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/aboutus" onClick={() => setSidebar(false)}>
              <InfoIcon style={{ color: "black", marginRight: "0.7rem" }} />
              About Us
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/contactus" onClick={() => setSidebar(false)}>
              <CallIcon style={{ color: "black", marginRight: "0.7rem" }} />
              Contact Us
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/favorites" onClick={() => setSidebar(false)}>
              <StarIcon style={{ color: "black", marginRight: "0.7rem" }} />
              Favorites
            </SidebarLink>
          </SidebarItem>
          <SideMenu>
            <Divider style={{ width: "100%" }} />
            <SidebarItem>
              <SidebarLink to="/login" onClick={logOut}>
                <Logout style={{ color: "black", marginRight: "0.7rem" }} />
                Logout
              </SidebarLink>
            </SidebarItem>
          </SideMenu>
        </SidebarMenu>
      </div>
    </>
  );
};

export default NavbarRenters;
