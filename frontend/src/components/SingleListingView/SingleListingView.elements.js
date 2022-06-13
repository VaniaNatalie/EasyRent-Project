import styled from "styled-components";
import { Link } from "react-router-dom";

export const ListingName = styled.h1`
  font-weight: bold;
  font-size: 40px;
`;

export const AddressDetail = styled.p`
  font-size: 18px;
`;

export const SizeDetail = styled.h3`
  font-weight: bold;
  margin-left: 7px;
`;

export const PriceDetail = styled.h2`
  font-weight: bold;
  margin: 25px 0;
  font-size: 28px;
`;

export const RentNowBtn = styled.li`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

export const RentNowLink = styled(Link)`
  border-radius: 22px;

  padding: 10px 50px;

  font-weight: bold;

  cursor: pointer;

  text-decoration: none;
  font-size: 16px;
  width: 100%;
  text-align: center;
  vertical-align: middle;

  background: transparent;
  border-style: solid;
  border-width: medium;
  border-color: #ffb443;
  color: #000;

  &:hover {
    background: #ffb443;
    color: white;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 1rem;
  }
`;

export const DetailSection = styled.div`
  max-width: 550px;
  padding-top: 0;
  padding-bottom: 60px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

export const Heading = styled.h3`
  font-weight: 20px;
  margin-bottom: 10px;
  font-size: 23px;
`;

export const SizeHeading = styled.h3`
  font-size: 20px;
  font-size: 23px;
`;

export const Wrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }
`;

export const TextWrapper = styled.div`
  max-width: 550px;
  padding-top: 0;
  padding-bottom: 30px;

  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

export const SectionNew = styled.div`
  background: #fff;
  padding: 50px 90px 90px 90px;
  color: #000;
`;

export const WrapButton = styled.div`
  padding: 30px 0 0 50px;
`;

export const Section = styled.div`
  background: #fff;
  padding: 40px 0 0 0;
  color: #000;
`;

export const WrapButtonCustom = styled.div`
  padding: 30px 0 20px 70px;
`;
