import React, { Component } from "react";
import { Grid } from "@mui/material";
import { GridCustom } from "../PropertyList/PropertyList.elements";
import ListingCard from "../ListingCard/ListingCard";
import { connect } from "react-redux";
import emptyImg from "../../images/empty_post.svg";
import { getListingsByLandlord } from "../../actions/post.actions";
import { Link } from "react-router-dom";

import {
  Section,
  LandlordWrapper,
  HeadingWrapper,
  LandlordHeading,
  LandlordSubheading,
  BtnWrapper,
} from "./LandlordPost.elements";

import { Container, Button } from "../../GlobalStyles";
import {
  WelcomeRow,
  WelcomeColumn,
  TextWrapper,
  TextTitle,
  Title,
  WelcomeTitle,
  ImgWrapper,
  Img,
} from "../WelcomeSection/WelcomeSection.elements";

class LandlordPost extends Component {
  componentDidMount() {
    this.props.getListingsByLandlord();
  }

  render() {
    const { listings } = this.props;

    return (
      <>
        <Section>
          <LandlordWrapper>
            {listings?.result?.length > 0 ? (
              <>
                <HeadingWrapper>
                  <LandlordHeading>Your</LandlordHeading>
                  <LandlordSubheading>Posts</LandlordSubheading>
                </HeadingWrapper>
                <GridCustom container alignItems="stretch" spacing={3}>
                  {listings?.result &&
                    listings?.result.slice(0, 3).map((listing, index) => (
                      <Grid key={index} item xs={12} sm={6} md={4}>
                        <ListingCard listing={listing} />
                      </Grid>
                    ))}
                </GridCustom>
                <BtnWrapper>
                  <Link to="/your-properties">
                    <Button big>See More</Button>
                  </Link>
                </BtnWrapper>
              </>
            ) : (
              <>
                <HeadingWrapper>
                  <LandlordHeading>You haven't post</LandlordHeading>
                  <LandlordSubheading>anything yet</LandlordSubheading>
                </HeadingWrapper>
                <BtnWrapper>
                  <Link to="/your-properties">
                    <Button big>Start now</Button>
                  </Link>
                </BtnWrapper>
              </>
            )}
          </LandlordWrapper>
        </Section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listings: state.listings,
  };
};

export default connect(mapStateToProps, {
  getListingsByLandlord,
})(LandlordPost);
