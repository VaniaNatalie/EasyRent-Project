import React, { useState } from "react";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import addImg from "../../images/form_add.svg";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Section } from "./AddProperty.elements";

import {
  Form,
  GenderInputWrapper,
  GenderHeading,
  CustomToggle,
  RentersColumn,
  RentersRow,
  Img,
  ImgWrapper,
} from "../SignUpRenters/SignUpRenters.elements";
import { Container } from "../../GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addListing } from "../../actions/post.actions";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CLEAR_MESSAGE } from "../../constants/user.constants";

export default function FormAddProperty() {
  const [values, setValues] = useState({
    listingName: "",
    address: "",
    district: "",
    ward: "",
    city: "",
    postcode: "",
    price: "",
    size: "",
    gender: "male",
    facilities: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const {
    listingName,
    address,
    district,
    ward,
    city,
    postcode,
    price,
    size,
    gender,
    facilities,
  } = values;

  const [housePhoto, setHousePhoto] = useState("");
  const [houseCertif, setHouseCertif] = useState("");

  const handleHousePhoto = async (e) => {
    const file = e.target.files[0];

    setHousePhoto(file);
  };

  const handleHouseCertif = async (e) => {
    const file = e.target.files[0];

    setHouseCertif(file);
  };

  const { message } = useSelector((state) => state.message);

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

    dispatch(addListing(formData))
      .then(() => {
        setSuccessMsg("Property successfully added!~");
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
    <Section>
      <Container>
        <RentersRow>
          <RentersColumn>
            <ImgWrapper>
              <Img src={addImg} alt="Add Property Image" />
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
              <CardContent>
                <Typography>Add Property</Typography>
                <Form onSubmit={handleSubmit}>
                  <Grid container columns={16}>
                    <Grid item xs={8}>
                      <TextField
                        className="listingName-input"
                        required
                        size="small"
                        value={values.listingName}
                        onChange={handleChange("listingName")}
                        id="listingName"
                        label="Listing name"
                        variant="outlined"
                        sx={{ marginTop: "1.2rem" }}
                      />
                      <TextField
                        className="address-input"
                        required
                        size="small"
                        value={values.address}
                        onChange={handleChange("address")}
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
                        value={values.district}
                        onChange={handleChange("district")}
                        sx={{ marginTop: "1.2rem" }}
                      />
                      <TextField
                        className="ward-input"
                        required
                        size="small"
                        id="ward"
                        label="Ward"
                        variant="outlined"
                        value={values.ward}
                        onChange={handleChange("ward")}
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
                        value={values.city}
                        onChange={handleChange("city")}
                        sx={{ marginTop: "1.2rem" }}
                      />
                      <TextField
                        className="postcode-input"
                        required
                        size="small"
                        id="postcode"
                        label="Postcode"
                        variant="outlined"
                        value={values.postcode}
                        onChange={handleChange("postcode")}
                        sx={{ marginTop: "1.2rem" }}
                      />
                      <TextField
                        className="price-input"
                        required
                        size="small"
                        id="price"
                        label="Price"
                        variant="outlined"
                        value={values.price}
                        onChange={handleChange("price")}
                        sx={{ marginTop: "1.2rem" }}
                      />
                      <TextField
                        className="size-input"
                        required
                        size="small"
                        id="size"
                        label="Size"
                        variant="outlined"
                        value={values.size}
                        onChange={handleChange("size")}
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
                      value={values.facilities}
                      onChange={handleChange("facilities")}
                      sx={{ marginTop: "1.2rem", marginBottom: "1rem" }}
                    />
                    <GenderInputWrapper>
                      <GenderHeading>Gender</GenderHeading>
                      <ToggleButtonGroup
                        size="small"
                        value={values.gender}
                        onChange={handleChange("gender")}
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
  );
}
