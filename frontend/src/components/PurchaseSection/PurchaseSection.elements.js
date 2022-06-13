import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 6px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  height: 500px;
  width: 100%;

  @media screen and (max-width: 796px) {
    width: 90%;
    height: 650px;
  }
`;

export const Section = styled.div`
  background: #fff;
  padding: 50px 0 110px 0;
  color: #000;
`;

export const Wrapper = styled.div`
  display: flex;
  padding-top: 40px;
  padding-left: 45px;
  padding-bottom: 20px;
  justify-content: flex-start;
`;

export const Heading = styled.h2`
  font-weight: bold;
`;

export const Subheading = styled.h4`
  font-weight: bold;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BtnWrapper = styled.div`
  margin: 10px 30px;
  diplay: flex;
  align-items: center;
  margin-left: auto;
`;
