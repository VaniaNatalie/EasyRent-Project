import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CREATE_REVIEW_RESET } from "../../constants/tenant.constants";
import { Container } from "../../GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  WelcomeColumn,
  WelcomeRow,
  ImgWrapper,
  Img,
} from "../WelcomeSection/WelcomeSection.elements";
import {
  ListingName,
  AddressDetail,
  DetailSection,
  PriceDetail,
  RentNowBtn,
  RentNowLink,
  Heading,
  Section,
  WrapButton,
  Wrapper,
  TextWrapper,
  SectionNew,
} from "./SingleListingView.elements";
import {
  Card,
  Box,
  Typography,
  Grid,
  TextField,
  Rating,
  Paper,
  Avatar,
  Button,
  List,
  Alert,
  Collapse,
} from "@mui/material";
import {
  getIndividuals,
  createListingReview,
} from "../../actions/tenants.actions";
import { CLEAR_MESSAGE } from "../../constants/user.constants";

const SingleListingView = () => {
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
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [housePhoto, setHousePhoto] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState([]);
  const [rating, setRating] = useState(0);
  const [star, setStar] = useState(0);
  const [numReview, setNumReview] = useState(0);
  const [reviewsComment, setReviewsComment] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const tenants = useSelector((state) => state.tenants);
  const { singleListing } = tenants;
  console.log(singleListing);

  const listingReview = useSelector((state) => state.listingReview);
  const { success } = listingReview;

  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    if (success) {
      // alert("Review Submitted!");
      setSuccessMsg("Review Submitted!~");
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
      setRating(0);
      setReviewsComment("");
      dispatch({ type: CREATE_REVIEW_RESET });
    } else {
      setTimeout(() => {
        dispatch({ type: CLEAR_MESSAGE });
      }, 2000);
    }

    dispatch(getIndividuals(id));
  }, [dispatch, success]);

  useEffect(() => {
    if (singleListing) {
      setListingName(singleListing.listingName);
      setAddress(singleListing.address);
      setDistrict(singleListing.district);
      setWard(singleListing.ward);
      setCity(singleListing.city);
      setPostcode(singleListing.postcode);
      setPrice(singleListing.price);
      setSize(singleListing.size);
      setGender(singleListing.gender);
      setFacilities(singleListing.facilities);
      setStar(singleListing.rating);
      setHousePhoto(singleListing.housephotos);
      setNumReview(singleListing.numberOfReviews);
    }
  }, [singleListing]);

  useEffect(() => {
    if (!facilities?.length) {
      console.log("Error, empty array!");
    } else {
      setValue(
        facilities[0].split(",").map(function (item) {
          return item.trim();
        })
      );
    }
  }, [facilities]);
  console.log(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createListingReview(id, { rating, reviewsComment }));
  };

  return (
    <>
      <WrapButton>
        <Button size="small" variant="outlined" startIcon={<ArrowBackIcon />}>
          <Link
            to={`/explore`}
            style={{ textDecoration: "none", color: "black" }}
          >
            Go back
          </Link>
        </Button>
      </WrapButton>
      <Section>
        <Container>
          <WelcomeRow>
            <WelcomeColumn>
              <ImgWrapper>
                <Img
                  src={`https://easyrent-node-backend.herokuapp.com/${housePhoto}`}
                  alt="Property Image"
                />
              </ImgWrapper>
            </WelcomeColumn>
            <WelcomeColumn>
              <Wrapper>
                <ListingName>{listingName}</ListingName>
                <AddressDetail>
                  {address}, {district}, {ward}, {city}, {postcode}
                </AddressDetail>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginTop: "20px",
                  }}
                >
                  <Rating value={star} readOnly precision={0.5} />
                  <Typography sx={{ marginLeft: "8px" }}>
                    {numReview}
                  </Typography>
                </div>
                <Typography>based on {numReview} reviews</Typography>
                <PriceDetail>{price} /month</PriceDetail>
                <RentNowBtn>
                  <RentNowLink to={`/checkout/${id}`}>Rent now</RentNowLink>
                </RentNowBtn>
                <TextWrapper>
                  <Typography variant="h6">
                    <strong>Description:</strong>
                  </Typography>

                  <Typography>- Size: {size}</Typography>
                  <Typography>- Gender: {gender}</Typography>
                </TextWrapper>
              </Wrapper>
            </WelcomeColumn>
            <WelcomeColumn>
              <Wrapper>
                <DetailSection>
                  <Heading>Details:</Heading>
                  <Grid container spacing={2}>
                    {value &&
                      value.map((deets, index) => (
                        <Grid key={index} item>
                          <Card
                            sx={{
                              display: "flex",
                              padding: "4px 20px",
                              backgroundColor: "#2bc66a",
                              color: "white",
                              fontWeight: "bold",
                              borderRadius: "22px",
                            }}
                          >
                            <Box sx={{ display: "flex" }}>
                              <Typography>{deets}</Typography>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                </DetailSection>
              </Wrapper>
            </WelcomeColumn>
          </WelcomeRow>
        </Container>
      </Section>
      <SectionNew>
        <Container>
          <Heading>Reviews</Heading>
          <Paper style={{ padding: "40px 20px" }}>
            {successMsg && (
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
                  {successMsg}
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
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar />
              </Grid>
              <Grid item xs zeroMinWidth>
                <form onSubmit={handleSubmit}>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">
                      Rate this listing
                    </Typography>
                    <Rating
                      name="Rating Label"
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </Box>
                  <TextField
                    multiline
                    rows={2}
                    fullWidth
                    id="reviewsComment"
                    value={reviewsComment}
                    onChange={(e) => setReviewsComment(e.target.value)}
                    placeholder="Enter your review here..."
                    variant="standard"
                  />
                  <Grid item>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      marginTop="8px"
                    >
                      <Button type="submit">Submit</Button>
                    </Box>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            style={{
              padding: "40px 20px",
              marginTop: "20px",
              backgroundColor: "transparent",
              maxHeight: 800,
              overflow: "auto",
            }}
          >
            {singleListing?.reviews.length === 0 && (
              <Heading>No Reviews</Heading>
            )}
            <List>
              {singleListing?.reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </List>
          </Paper>
        </Container>
      </SectionNew>
    </>
  );
};

export default SingleListingView;
