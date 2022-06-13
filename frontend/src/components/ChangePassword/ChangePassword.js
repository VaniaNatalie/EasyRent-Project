import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { Fade, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Button, CssTextField } from "../../GlobalStyles";
import LockIcon from "@mui/icons-material/HttpsOutlined";
import changeImg from "../../images/change_password.svg";
import ArrowIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { CLEAR_MESSAGE } from "../../constants/user.constants";

import {
  ChangeSection,
  ChangeRow,
  ChangeColumn,
  ImgWrapper,
  Img,
  ChangeFormContainer,
  ChangeFormCard,
  ChangeHeading,
  Form,
  ArrowLink,
} from "./ChangePassword.elements";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const { message } = useSelector((state) => state.message);

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const changePass = useSelector((state) => state.changePass);
  const { error, success } = changePass;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(changePassword({ password, confirmPassword }))
      .then(() => {
        setSuccessMessage(`Hi, your password successfully changed!~`);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/account");
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch({ type: CLEAR_MESSAGE });
        }, 2000);
      });
  };

  return (
    <>
      <ChangeSection>
        <Container>
          <ChangeRow>
            <ChangeColumn>
              <ArrowLink to="/account">
                <ArrowIcon style={{ color: "#2bc66a" }} />
              </ArrowLink>
              <ImgWrapper>
                <Img src={changeImg} alt="Change Password Image" />
              </ImgWrapper>
            </ChangeColumn>
            <ChangeColumn>
              <ChangeFormContainer>
                <Fade in timeout={2500}>
                  <ChangeFormCard>
                    <ChangeHeading>Reset your password</ChangeHeading>
                    {successMessage && (
                      <Collapse in={open}>
                        <Alert
                          severity="success"
                          sx={{
                            marginTop: "0.2rem",
                            marginBottom: "0.8rem",
                          }}
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                        >
                          {successMessage}
                        </Alert>
                      </Collapse>
                    )}
                    {message && (
                      <Collapse in={open}>
                        <Alert
                          severity="error"
                          sx={{
                            marginTop: "0.2rem",
                            marginBottom: "0.8rem",
                          }}
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                        >
                          {message}
                        </Alert>
                      </Collapse>
                    )}
                    <Form onSubmit={handleSubmit}>
                      <CssTextField
                        className="pass-input"
                        required
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        }}
                      />
                      <CssTextField
                        className="confirm-pass-input"
                        required
                        fullWidth
                        type="password"
                        id="confirmPassword"
                        label="Confirm password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        }}
                      />

                      <Button type="submit" big>
                        Submit
                      </Button>
                    </Form>
                  </ChangeFormCard>
                </Fade>
              </ChangeFormContainer>
            </ChangeColumn>
          </ChangeRow>
        </Container>
      </ChangeSection>
    </>
  );
};

export default ChangePassword;
