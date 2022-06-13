import React from "react";
import SignUpRentersImg from "../../images/signup_logo_2.svg";
import FullNameIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailIcon from "@mui/icons-material/AlternateEmailOutlined";
import UsernameIcon from "@mui/icons-material/BadgeOutlined";
import { Container, Button, CssTextField } from "../../GlobalStyles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Fade, InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/HttpsOutlined";
import ArrowIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { registerTenant } from "../../actions/auth";
import { Alert } from "@mui/material";
import { CLEAR_MESSAGE } from "../../constants/user.constants";

import {
  RentersSection,
  RentersRow,
  RentersColumn,
  ArrowLink,
  ImgWrapper,
  Img,
  RentersFormContainer,
  RentersFormCard,
  RentersHeading,
  RentersSubHeading,
  LinkWrapper,
  GenderHeading,
  GenderInputWrapper,
  LoginLink,
  CustomToggle,
  RoleInputWrapper,
  RoleHeading,
  Form,
} from "./SignUpRenters.elements";
import { useNavigate } from "react-router-dom";

const SignUpRenters = () => {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    gender: "male",
    email: "",
    password: "",
    role: "tenant",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const renterSignup = useSelector((state) => state.userRegister);
  const messages = useSelector((state) => state.message);

  const { loading } = renterSignup;
  const { message } = messages;

  const { fullname, username, gender, email, password, role } = values;

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(
        registerTenant(fullname, username, gender, email, password, role)
      )
        .then(() => {
          setSuccessMessage(
            `Hi ${username}, your sign up is successful. We'll direct you to the login page!~`
          );
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/login");
          }, 3000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch({ type: CLEAR_MESSAGE });
          }, 2000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RentersSection>
      <Container>
        <RentersRow>
          <RentersColumn>
            <ArrowLink to="/signup">
              <ArrowIcon style={{ color: "#2bc66a" }} />
            </ArrowLink>
            <ImgWrapper>
              <Img src={SignUpRentersImg} alt="Rental Searcher Sign Up Image" />
            </ImgWrapper>
          </RentersColumn>
          <RentersColumn>
            <RentersFormContainer>
              <Fade in timeout={2500}>
                <RentersFormCard id="renters-signup-form">
                  <RentersHeading>Sign Up</RentersHeading>
                  <RentersSubHeading>for Rental Searchers</RentersSubHeading>
                  {loading && <Loading />}
                  {successMessage && (
                    <>
                      <Alert severity="success">{successMessage}</Alert>{" "}
                      <br></br>
                    </>
                  )}
                  {message && (
                    <>
                      <Alert severity="error">{message}</Alert> <br></br>
                    </>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <CssTextField
                      className="fullname-input"
                      required
                      fullWidth
                      value={values.fullname}
                      onChange={handleChange("fullname")}
                      id="fullname"
                      label="Enter fullname"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FullNameIcon
                              fontSize="small"
                              sx={{ color: "#2bc66a" }}
                            />
                          </InputAdornment>
                        ),
                        style: {
                          marginBottom: "1rem",
                        },
                      }}
                    />
                    <CssTextField
                      className="username-input"
                      required
                      fullWidth
                      value={values.username}
                      onChange={handleChange("username")}
                      id="username"
                      label="Enter username"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <UsernameIcon
                              fontSize="small"
                              sx={{ color: "#2bc66a" }}
                            />
                          </InputAdornment>
                        ),
                        style: {
                          marginBottom: "1rem",
                        },
                      }}
                    />
                    <GenderInputWrapper>
                      <GenderHeading>Gender</GenderHeading>
                      <ToggleButtonGroup
                        size="small"
                        value={values.gender}
                        onChange={handleChange("gender")}
                        exclusive
                      >
                        <CustomToggle value="male">Male</CustomToggle>
                        <CustomToggle value="female">Female</CustomToggle>
                      </ToggleButtonGroup>
                    </GenderInputWrapper>
                    <CssTextField
                      className="email-input"
                      required
                      fullWidth
                      id="email"
                      label="Enter email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange("email")}
                      sx={{ marginTop: "1.2rem" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon
                              fontSize="small"
                              sx={{ color: "#2bc66a" }}
                            />
                          </InputAdornment>
                        ),
                        style: {
                          marginBottom: "1rem",
                        },
                      }}
                    />
                    <CssTextField
                      className="pass-input"
                      required
                      fullWidth
                      id="password"
                      label="Enter password"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              fontSize="small"
                              sx={{ color: "#2bc66a" }}
                            />
                          </InputAdornment>
                        ),
                        style: {
                          marginBottom: "1rem",
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleShowPassword}
                              onMouseDown={handleMouseDown}
                              sx={{ marginRight: "0.5px" }}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <RoleInputWrapper>
                      <RoleHeading>Role</RoleHeading>
                      <ToggleButtonGroup size="small" value="tenant" exclusive>
                        <CustomToggle value={values.role} id="tenant">
                          Rental Searcher
                        </CustomToggle>
                      </ToggleButtonGroup>
                    </RoleInputWrapper>
                    <Button
                      type="submit"
                      style={{ padding: "12px 120px", marginTop: "1.2rem" }}
                    >
                      Submit
                    </Button>
                  </Form>
                  <LinkWrapper>
                    Already have an account?
                    <LoginLink to="/login">Log In</LoginLink>
                  </LinkWrapper>
                </RentersFormCard>
              </Fade>
            </RentersFormContainer>
          </RentersColumn>
        </RentersRow>
      </Container>
    </RentersSection>
  );
};

export default SignUpRenters;
