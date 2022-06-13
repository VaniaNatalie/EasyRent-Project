import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Section,
  RenterWrapper,
  HeadingWrapper,
  RenterHeading,
  RenterSubheading,
} from "./RenterRec.elements";
import { GridCustom } from "../PropertyList/PropertyList.elements";
import { Grid } from "@mui/material";
import { getAllListingsTenants } from "../../actions/tenants.actions";
import TenantListingCard from "../TenantListingCard/TenantListingCard";
import { BtnWrapper } from "../LandlordPostSection/LandlordPost.elements";
import { Link } from "react-router-dom";
import { Container, Button } from "../../GlobalStyles";

class RenterRecommendation extends Component {
  constructor(props) {
    super(props);
    this.filterRatingOrder = this.filterRatingOrder.bind(this);
    this.onChangeFilterRating = this.onChangeFilterRating.bind(this);

    this.state = {
      filterRatingOrder: "",
    };
  }

  componentDidMount() {
    this.props.getAllListingsTenants();
  }

  onChangeFilterRating(e) {
    const filterRatingOrder = e.target.value;
    this.setState({
      filterRatingOrder: filterRatingOrder,
    });
  }

  filterRatingOrder(filteredData) {
    if (!this.state.filterRatingOrder) {
      return filteredData;
    }
    if (filteredData?.length) {
      const listingsArray = Object.keys(filteredData).map(
        (key) => filteredData[key]
      );

      listingsArray.sort((a, b) => {
        return parseInt(b.rating) - parseInt(a.rating);
      });

      return listingsArray;
    }
  }

  render() {
    const { tenants } = this.props;
    const { listOfListings, favorites } = tenants;

    var filteredData = this.filterRatingOrder(listOfListings?.result);

    return (
      <>
        <Section id="explore">
          <Container>
            <RenterWrapper>
              <HeadingWrapper>
                <RenterHeading>Best-rated</RenterHeading>
                <RenterSubheading>
                  Rental Rooms and Houses from Renties
                </RenterSubheading>
              </HeadingWrapper>
              <GridCustom container alignItems="stretch" spacing={3}>
                {filteredData &&
                  filteredData?.slice(0, 3).map((tenant, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                      <TenantListingCard
                        tenant={tenant}
                        favorites={favorites}
                      />
                    </Grid>
                  ))}
              </GridCustom>
              <BtnWrapper>
                <Link to="/explore">
                  <Button big>See More</Button>
                </Link>
              </BtnWrapper>
            </RenterWrapper>
          </Container>
        </Section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    tenants: state.tenants,
  };
}

export default connect(mapStateToProps, {
  getAllListingsTenants,
})(RenterRecommendation);
