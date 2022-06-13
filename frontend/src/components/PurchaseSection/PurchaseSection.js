import React, { useState, useEffect } from "react";

import {
  Container,
  AccountHeading,
  AccountRow,
  AccountColumn,
  ImgWrapper,
  Img,
  HeadingWrapper,
  TextWrapper,
} from "../TenantAccount/TenantAccount.elements";
import { getIndividuals } from "../../actions/tenants.actions";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import {
  Card,
  Section,
  Wrapper,
  Heading,
  Subheading,
  Wrap,
  BtnWrapper,
} from "./PurchaseSection.elements";

import {
  ListingName,
  AddressDetail,
  WrapButton,
} from "../SingleListingView/SingleListingView.elements";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const PurchaseSection = () => {
  let { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const [listingName, setListingName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [price, setPrice] = useState("");
  const [housePhoto, setHousePhoto] = useState("");

  useEffect(() => {
    dispatch(getIndividuals(id));
  }, [dispatch]);

  const tenants = useSelector((state) => state.tenants);
  const { singleListing } = tenants;
  console.log(singleListing);

  useEffect(() => {
    if (singleListing) {
      setListingName(singleListing.listingName);
      setAddress(singleListing.address);
      setDistrict(singleListing.district);
      setWard(singleListing.ward);
      setCity(singleListing.city);
      setPostcode(singleListing.postcode);
      setPrice(singleListing.price);
      setHousePhoto(singleListing.housephotos);
    }
  }, [singleListing]);

  return (
    <>
      <WrapButton>
        <Button size="small" variant="outlined" startIcon={<ArrowBackIcon />}>
          <Link
            to={`/explore/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            Go back
          </Link>
        </Button>
      </WrapButton>
      <Section>
        <Container>
          <Card>
            <Wrapper>
              <Heading>Your purchase</Heading>
            </Wrapper>
            <AccountRow>
              <AccountColumn>
                <ImgWrapper>
                  <Img
                    src={`https://easyrent-node-backend.herokuapp.com/${housePhoto}`}
                    alt="Property Image"
                  />
                </ImgWrapper>
              </AccountColumn>
              <AccountColumn>
                <TextWrapper>
                  <ListingName>{listingName}</ListingName>
                  <AddressDetail>
                    {address}, {district}, {ward}, {city}, {postcode}
                  </AddressDetail>
                </TextWrapper>
              </AccountColumn>
            </AccountRow>
            <Wrapper>
              <TextWrapper>
                <Subheading>Bill</Subheading>
                <Wrap>
                  <Typography>Subtotal:</Typography>
                  <Typography>{price}</Typography>
                </Wrap>
              </TextWrapper>
              <BtnWrapper>
                <Button
                  size="small"
                  color="success"
                  variant="outlined"
                  startIcon={<VerifiedUserIcon />}
                >
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Purchase
                  </Link>
                </Button>
              </BtnWrapper>
            </Wrapper>
          </Card>
        </Container>
      </Section>
    </>
  );
};

export default PurchaseSection;
