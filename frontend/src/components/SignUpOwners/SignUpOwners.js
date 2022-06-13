import React, { useState } from "react";
import SignUpOwnersImg from "../../images/signup_logo_1.svg";
import FullNameIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailIcon from "@mui/icons-material/AlternateEmailOutlined";
import UsernameIcon from "@mui/icons-material/BadgeOutlined";
import { Container, Button, CssTextField } from "../../GlobalStyles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Alert, Fade, InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/HttpsOutlined";
import ArrowIcon from "@mui/icons-material/ArrowBackIosOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { registerLanlord } from "../../actions/auth";
import Loading from "../Loading";

import {
  OwnersSection,
  OwnersRow,
  OwnersColumn,
  ArrowLink,
  ImgWrapper,
  Img,
  OwnersFormContainer,
  OwnersFormCard,
  OwnersHeading,
  OwnersSubHeading,
  LinkWrapper,
  LoginLink,
  RoleInputWrapper,
  RoleHeading,
  CustomToggle,
  Form,
} from "./SignUpOwners.elements";

import { useNavigate } from "react-router-dom";
import { CLEAR_MESSAGE } from "../../constants/user.constants";

const SignUpOwners = () => {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    mobile_phone: "",
    password: "",
    role: "landlord",
    showPassword: false,
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

  const landlordSignup = useSelector((state) => state.userRegister);
  const messages = useSelector((state) => state.message);

  const { loading } = landlordSignup;
  const { message } = messages;

  const { fullname, username, mobile_phone, email, password, role } = values;

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      dispatch(
        registerLanlord(fullname, username, mobile_phone, email, password, role)
      )
        .then(() => {
          setSuccessMessage(
            `Hi ${username}, your sign up is successful. We'll direct you to the login page!~`
          );
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/login");
          }, 2000);
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
    <OwnersSection>
      <Container>
        <OwnersRow>
          <OwnersColumn>
            <ArrowLink to="/signup">
              <ArrowIcon style={{ color: "#2bc66a" }} />
            </ArrowLink>
            <ImgWrapper>
              <Img src={SignUpOwnersImg} alt="Property Owner Sign Up Image" />
            </ImgWrapper>
          </OwnersColumn>
          <OwnersColumn>
            <OwnersFormContainer>
              <Fade in timeout={2500}>
                <OwnersFormCard>
                  <OwnersHeading>Sign Up</OwnersHeading>
                  <OwnersSubHeading>for Property Owner</OwnersSubHeading>
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
                    <CssTextField
                      className="email-input"
                      required
                      fullWidth
                      id="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      label="Enter email"
                      variant="outlined"
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
                      className="mobile-phone-input"
                      required
                      fullWidth
                      id="mobile_phone"
                      value={values.mobile_phone}
                      onChange={handleChange("mobile_phone")}
                      label="Enter mobile phone"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon
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
                      <ToggleButtonGroup
                        size="small"
                        value="landlord"
                        exclusive
                      >
                        <CustomToggle value={values.role} id="landlord">
                          Property Owner
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
                </OwnersFormCard>
              </Fade>
            </OwnersFormContainer>
          </OwnersColumn>
        </OwnersRow>
      </Container>
    </OwnersSection>
  );
};

export default SignUpOwners;
