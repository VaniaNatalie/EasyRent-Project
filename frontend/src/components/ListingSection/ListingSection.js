import React, { useEffect, useState } from "react";
import {
  getIndividualListing,
  updateListing,
} from "../../actions/post.actions";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import updateImg from "../../images/update_img.svg";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Container } from "../../GlobalStyles";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  RentersRow,
  RentersColumn,
  ImgWrapper,
  Img,
  Form,
  GenderInputWrapper,
  GenderHeading,
  CustomToggle,
} from "../SignUpRenters/SignUpRenters.elements";
import { Section } from "../AddProperty/AddProperty.elements";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE } from "../../constants/user.constants";

const ListingSection = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIndividualListing(id));
  }, []);

  const listings = useSelector((state) => state.listings);
  const { singleList } = listings;

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
  const [houseCertif, setHouseCertif] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [open, setOpen] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();

  useEffect(() => {
    if (singleList) {
      setListingName(singleList.listingName);
      setAddress(singleList.address);
      setDistrict(singleList.district);
      setWard(singleList.ward);
      setCity(singleList.city);
      setPostcode(singleList.postcode);
      setPrice(singleList.price);
      setSize(singleList.size);
      setGender(singleList.gender);
      setFacilities(singleList.facilities);
      setHouseCertif(singleList.houseCertif);
      setHousePhoto(singleList.housePhoto);
    }
  }, [singleList]);

  const handleHousePhoto = async (e) => {
    const file = e.target.files[0];
    setHousePhoto(file);
  };

  const handleHouseCertif = async (e) => {
    const file = e.target.files[0];
    setHouseCertif(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("listingName", listingName);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("ward", ward);
    formData.append("city", city);
    formData.append("postcode", postcode);
    formData.append("price", price);
    formData.append("gender", gender);
    formData.append("size", size);
    formData.append("facilities", facilities);
    formData.append("housephotos", housePhoto);
    formData.append("housecertif", houseCertif);

    dispatch(updateListing(id, formData))
      .then(() => {
        setSuccessMsg("Property successfully updated!~");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/your-properties");
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
      <Section>
        <Container>
          <RentersRow>
            <RentersColumn>
              <ImgWrapper>
                <Img src={updateImg} alt="Update Property Image" />
              </ImgWrapper>
            </RentersColumn>
            <RentersColumn>
              <Card>
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
                      severity="info"
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
                <CardContent>
                  <Typography>Edit Property</Typography>
                  <Form onSubmit={handleSubmit}>
                    <Grid container columns={16}>
                      <Grid item xs={8}>
                        <TextField
                          className="listingName-input"
                          required
                          size="small"
                          value={listingName || ""}
                          onChange={(e) => setListingName(e.target.value)}
                          id="listingName"
                          label="Listing name"
                          variant="outlined"
                          sx={{ marginTop: "1.2rem" }}
                        />
                        <TextField
                          className="address-input"
                          required
                          size="small"
                          value={address || ""}
                          onChange={(e) => setAddress(e.target.value)}
                          id="address"
                          label="Address"
                          variant="outlined"
                          sx={{ marginTop: "1.2rem" }}
                        />
                        <TextField
                          className="district-input"
                          required
                          size="small"
                          id="district"
                          label="District"
                          variant="outlined"
                          value={district || ""}
                          onChange={(e) => setDistrict(e.target.value)}
                          sx={{ marginTop: "1.2rem" }}
                        />
                        <TextField
                          className="ward-input"
                          required
                          size="small"
                          id="ward"
                          label="Ward"
                          variant="outlined"
                          value={ward || ""}
                          onChange={(e) => setWard(e.target.value)}
                          sx={{ marginTop: "1.2rem" }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          className="city-input"
                          required
                          size="small"
                          id="city"
                          label="City"
                          variant="outlined"
                          value={city || ""}
                          onChange={(e) => setCity(e.target.value)}
                          sx={{ marginTop: "1.2rem" }}
                        />
                        <TextField
                          className="postcode-input"
                          required
                          size="small"
                          id="postcode"
                          label="Postcode"
                          variant="outlined"
                          value={postcode || ""}
                          onChange={(e) => setPostcode(e.target.value)}
                          sx={{ marginTop: "1.2rem" }}
                        />
                        <TextField
                          className="price-input"
                          required
                          size="small"
                          id="price"
                          label="Price"
                          variant="outlined"
                          value={price || ""}
                          onChange={(e) => setPrice(e.target.value)}
                          sx={{ marginTop: "1.2rem" }}
                        />
                        <TextField
                          className="size-input"
                          required
                          size="small"
                          id="size"
                          label="Size"
                          variant="outlined"
                          value={size || ""}
                          onChange={(e) => setSize(e.target.value)}
                          sx={{ marginTop: "1.2rem", marginBottom: "1rem" }}
                        />
                      </Grid>
                      <GenderInputWrapper>
                        <GenderHeading>Facilities</GenderHeading>
                      </GenderInputWrapper>
                      <TextField
                        className="facilities-input"
                        required
                        fullWidth
                        size="small"
                        id="size"
                        label="Facilities"
                        variant="outlined"
                        value={facilities || ""}
                        onChange={(e) => setFacilities(e.target.value)}
                        sx={{ marginTop: "1.2rem", marginBottom: "1rem" }}
                      />
                      <GenderInputWrapper>
                        <GenderHeading>Gender</GenderHeading>
                        <ToggleButtonGroup
                          size="small"
                          value={gender || ""}
                          onChange={(e) => setGender(e.target.value)}
                          exclusive
                        >
                          <CustomToggle value="male">Male</CustomToggle>
                          <CustomToggle value="female">Female</CustomToggle>
                          <CustomToggle value="all">All</CustomToggle>
                        </ToggleButtonGroup>
                      </GenderInputWrapper>
                      <GenderInputWrapper style={{ marginTop: "2rem" }}>
                        <GenderHeading>Images</GenderHeading>
                        <input
                          type="file"
                          required
                          name="housephotos"
                          accept=".png"
                          onChange={(e) => {
                            handleHousePhoto(e);
                          }}
                        />
                      </GenderInputWrapper>
                      <GenderInputWrapper style={{ marginTop: "2rem" }}>
                        <GenderHeading>Certification</GenderHeading>
                        <input
                          type="file"
                          required
                          name="housecertif"
                          accept=".png"
                          onChange={(e) => {
                            handleHouseCertif(e);
                          }}
                        />
                      </GenderInputWrapper>
                      <Button
                        type="submit"
                        variant="outlined"
                        color="success"
                        sx={{ marginTop: "2rem", width: "100%" }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Form>
                </CardContent>
              </Card>
            </RentersColumn>
          </RentersRow>
        </Container>
      </Section>
    </>
  );
};

export default ListingSection;
