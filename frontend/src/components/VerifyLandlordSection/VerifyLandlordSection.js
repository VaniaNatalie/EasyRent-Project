import React from "react";
import { Container } from "../../GlobalStyles";
import verifyImg from "../../images/verify_account.svg";
import addImg from "../../images/add_properties.svg";
import { Fade } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Section,
  WelcomeRow,
  WelcomeColumn,
  TextWrapper,
  TextTitle,
  Title,
  WelcomeTitle,
  ImgWrapper,
  Img,
} from "../WelcomeSection/WelcomeSection.elements";
import { JoinBtn, JoinLink } from "./Verify.elements";

const VerifyLandlordSection = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  return (
    <>
      <Section>
        <Container>
          {user?.user.isVerified === false && (
            <>
              <Fade in timeout={2500}>
                <WelcomeRow>
                  <WelcomeColumn>
                    <TextWrapper>
                      <TextTitle>
                        <Title>Want to start adding</Title>
                        <WelcomeTitle>your properties?</WelcomeTitle>
                      </TextTitle>
                      <JoinBtn>
                        <JoinLink to="/verify">Verify Now</JoinLink>
                      </JoinBtn>
                    </TextWrapper>
                  </WelcomeColumn>
                  <WelcomeColumn>
                    <ImgWrapper>
                      <Img src={verifyImg} alt="Verify account image" />
                    </ImgWrapper>
                  </WelcomeColumn>
                </WelcomeRow>
              </Fade>
            </>
          )}
          {user?.user.isVerified === true && (
            <>
              <Fade in timeout={2500}>
                <WelcomeRow>
                  <WelcomeColumn>
                    <TextWrapper>
                      <TextTitle>
                        <Title>Start adding</Title>
                        <WelcomeTitle>your properties!</WelcomeTitle>
                      </TextTitle>
                      <JoinBtn>
                        <JoinLink to="/add-properties">Start now</JoinLink>
                      </JoinBtn>
                    </TextWrapper>
                  </WelcomeColumn>
                  <WelcomeColumn>
                    <ImgWrapper>
                      <Img src={addImg} alt="Add Properties image" />
                    </ImgWrapper>
                  </WelcomeColumn>
                </WelcomeRow>
              </Fade>
            </>
          )}
        </Container>
      </Section>
    </>
  );
};

export default VerifyLandlordSection;
