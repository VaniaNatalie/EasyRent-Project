import React, { useState } from "react";
import { Fade, InputAdornment } from "@mui/material";
import { Container, Button, CssTextField } from "../../GlobalStyles";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockIcon from "@mui/icons-material/HttpsOutlined";
import loginImg from "../../images/login_image.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowIcon from "@mui/icons-material/ArrowBackIosOutlined";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { Alert } from "@mui/material";
import { CLEAR_MESSAGE } from "../../constants/user.constants";

import {
  LoginSection,
  LoginRow,
  ImgWrapper,
  Img,
  LoginColumn,
  LoginFormContainer,
  LoginFormCard,
  LoginHeading,
  ForgetPass,
  LinkWrapper,
  SignUpLink,
  TextWrapper,
  ArrowLink,
  Form,
} from "./Login.elements";

import Loading from "../Loading";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading } = userLogin;
  const { message } = useSelector((state) => state.message);

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password))
      .then(() => {
        setSuccessMessage(`Your login is successful. Welcome back!~`);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch({ type: CLEAR_MESSAGE });
        }, 2000);
      });
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <LoginSection>
      <Container>
        <LoginRow>
          <LoginColumn>
            <ArrowLink to="/">
              <ArrowIcon style={{ color: "#2bc66a" }} />
            </ArrowLink>
            <ImgWrapper>
              <Img src={loginImg} alt="Login Image" />
            </ImgWrapper>
          </LoginColumn>
          <LoginColumn>
            <LoginFormContainer>
              <Fade in timeout={2500}>
                <LoginFormCard>
                  <LoginHeading>Log In</LoginHeading>
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
                      className="email-input"
                      required
                      fullWidth
                      id="email"
                      label="Enter email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange("email")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
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
                      type={values.showPassword ? "text" : "password"}
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleShowPassword}
                              onMouseDown={handleMouseDown}
                              sx={{ marginRight: "0.5px" }}
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextWrapper>
                      <ForgetPass to="/forgetPassword">
                        Forget Password?
                      </ForgetPass>
                    </TextWrapper>
                    <Button type="submit" big>
                      Submit
                    </Button>
                  </Form>
                  <LinkWrapper>
                    Don't have an account?
                    <SignUpLink to="/signup">Sign Up</SignUpLink>
                  </LinkWrapper>
                </LoginFormCard>
              </Fade>
            </LoginFormContainer>
          </LoginColumn>
        </LoginRow>
      </Container>
    </LoginSection>
  );
};

export default Login;
