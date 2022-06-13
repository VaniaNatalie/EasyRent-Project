import { useNavigate } from "react-router-dom";
import unauthorizedImage from "../images/unauthorized_image.svg";
import { Container } from "../GlobalStyles";
import { Fade, Button } from "@mui/material";
import {
  Section,
  WelcomeRow,
  WelcomeColumn,
  TextWrapper,
  TextTitle,
  Title,
  Subtitle,
  ImgWrapper,
  BtnWrapper,
  Img,
} from "../components/WelcomeSection/WelcomeSection.elements";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <Section>
        <Container>
          <Fade in timeout={2500}>
            <WelcomeRow>
              <WelcomeColumn>
                <TextWrapper>
                  <TextTitle>
                    <Title>Unauthorized</Title>
                  </TextTitle>
                  <Subtitle>
                    You do not have access to the requested page.
                  </Subtitle>
                  <BtnWrapper>
                    <Button variant="outlined" onClick={goBack}>
                      Go back
                    </Button>
                  </BtnWrapper>
                </TextWrapper>
              </WelcomeColumn>
              <WelcomeColumn>
                <ImgWrapper>
                  <Img src={unauthorizedImage} alt="unauthorized image" />
                </ImgWrapper>
              </WelcomeColumn>
            </WelcomeRow>
          </Fade>
        </Container>
      </Section>
    </>
  );
};

export default Unauthorized;
