import React, { useState } from "react";
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import { CardCustom } from "./ListingCard.elements";
import { useDispatch } from "react-redux";
import {
  deleteListing,
  getListingsByLandlord,
} from "../../actions/post.actions";

export default function ListingCard({ listing }) {
  const dispatch = useDispatch();

  const url = `https://easyrent-node-backend.herokuapp.com/${listing.housephotos}`;

  const handleDelete = (id) => {
    dispatch(deleteListing(id));
    dispatch(getListingsByLandlord());
  };

  return (
    <>
      <CardCustom>
        <CardMedia
          component="img"
          image={url}
          sx={{ height: "100%", width: "100%" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {listing.city}, {listing.ward}, {listing.district},{" "}
            {listing.postcode}
          </Typography>

          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{ color: "#2bc66a" }}
          >
            {listing.listingName}
          </Typography>

          <Typography variant="price" component="h5" gutterBottom>
            {listing.price} /month
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {listing.address}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            to={`/your-properties/${listing._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button size="small">Edit</Button>
          </Link>
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(listing._id)}
          >
            Delete
          </Button>
        </CardActions>
      </CardCustom>
    </>
  );
}
