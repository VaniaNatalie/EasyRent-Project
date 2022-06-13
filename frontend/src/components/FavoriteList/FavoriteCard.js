import React, { useEffect, useState } from "react";
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";

import { CardCustom } from "../ListingCard/ListingCard.elements";

export default function FavoriteCard({ tenant }) {
  const dispatch = useDispatch();

  const url = `https://easyrent-node-backend.herokuapp.com/${tenant.housephotos}`;

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
            {tenant.city}, {tenant.ward}, {tenant.district}, {tenant.postcode}
          </Typography>

          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{ color: "#2bc66a" }}
          >
            {tenant.listingName}
          </Typography>

          <Typography variant="price" component="h5" gutterBottom>
            {tenant.price} /month
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {tenant.address}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link
            to={`/explore/${tenant._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button size="small">See More</Button>
          </Link>
        </CardActions>
      </CardCustom>
    </>
  );
}
