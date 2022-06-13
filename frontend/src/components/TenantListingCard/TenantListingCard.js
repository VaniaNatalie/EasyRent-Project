import React, { useEffect, useState } from "react";
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
} from "@mui/material";

import { Link } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import {
  listingFavorites,
  getAllFavorites,
  deleteFavorites,
} from "../../actions/tenants.actions";

import { CardCustom } from "../ListingCard/ListingCard.elements";

export default function TenantListingCard({ tenant, favorites }) {
  const dispatch = useDispatch();

  const url = `https://easyrent-node-backend.herokuapp.com/${tenant.housephotos}`;

  const tenants = useSelector((state) => state.tenants);
  console.log(tenants);
  // const { favorites } = tenants;
  // console.log(favorites);

  useEffect(() => {
    if (favorites) {
      localStorage.setItem("favorites", JSON.stringify(favorites || []));
    }
  }, [favorites]);

  const handleSetFavorites = (id) => {
    dispatch(listingFavorites(id));
  };

  const handleDeleteFavorites = (id) => {
    dispatch(deleteFavorites(id));
  };

  const exists = (tenant) => {
    if (
      favorites &&
      favorites?.filter((item) => item.id === tenant._id).length > 0
    ) {
      return true;
    }
    return false;
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Rating value={tenant.rating} readOnly precision={0.5} />
            <Typography sx={{ marginLeft: "8px" }}>
              {tenant.numberOfReviews} Reviews
            </Typography>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <Button size="small">
            <Link
              to={`/explore/${tenant._id}`}
              style={{ textDecoration: "none" }}
            >
              See More
            </Link>
          </Button>
          <IconButton
            onClick={() =>
              exists(tenant)
                ? handleDeleteFavorites(tenant._id)
                : handleSetFavorites(tenant._id)
            }
            onMouseDown={handleMouseDown}
            sx={{ marginLeft: "auto", color: "#ffb443" }}
          >
            {exists(tenant) ? <StarIcon /> : <StarOutlineIcon />}
          </IconButton>
        </CardActions>
      </CardCustom>
    </>
  );
}
