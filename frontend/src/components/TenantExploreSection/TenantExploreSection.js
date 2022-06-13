import React, { useEffect, Component } from "react";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { getAllListingsTenants } from "../../actions/tenants.actions";
import TenantListingCard from "../TenantListingCard/TenantListingCard";
import { GridCustom } from "../PropertyList/PropertyList.elements";
import { Section, Wrap } from "./TenantExploreSection.elements";
import { Container } from "../../GlobalStyles";
import { getAllFavorites } from "../../actions/tenants.actions";
import { Grid, FormControl, MenuItem, Select } from "@mui/material";

class TenantExploreSection extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
    this.searchFilterGender = this.searchFilterGender.bind(this);
    this.filterByGender = this.filterByGender.bind(this);
    this.searchFilterRating = this.searchFilterRating.bind(this);
    this.filterRatingByOrder = this.filterRatingByOrder.bind(this);
    this.searchFilterRatingOrder = this.searchFilterRatingOrder.bind(this);

    this.state = {
      searchQuery: "",
      condition: ["listingName", "city", "address", "ward", "district"],
      filterGender: "",
      filterRatingOrder: "",
    };
  }

  componentDidMount() {
    this.props.getAllListingsTenants();
  }

  onChangeSearchQuery(e) {
    const searchQuery = e.target.value;
    this.setState({
      searchQuery: searchQuery,
    });
  }

  searchFilterGender(e) {
    const filterGender = e.target.value;
    this.setState({
      filterGender: filterGender,
    });
  }

  searchFilterRatingOrder(e) {
    const filterRatingOrder = e.target.value;

    this.setState({
      filterRatingOrder: filterRatingOrder,
    });
  }

  filterByGender(filteredData) {
    if (!this.state.filterGender) {
      return filteredData;
    }
    const filteredGenderList = filteredData?.filter((listing) => {
      return listing.gender.split(" ").indexOf(this.state.filterGender) !== -1;
    });
    return filteredGenderList;
  }

  searchFilterRating(e) {
    const filterRating = e.target.value;
    this.setState({
      filterRating: filterRating,
    });
  }

  // filterByRating(filteredData) {
  //   if (!this.state.filterRating) {
  //     return filteredData;
  //   }
  //   const filteredRatingList = filteredData?.filter((listing) => {
  //     return parseInt(listing.rating) === parseInt(this.state.filterRating);
  //   });
  //   return filteredRatingList;
  // }

  filterRatingByOrder(filteredData) {
    if (!this.state.filterRatingOrder) {
      return filteredData;
    }
    if (filteredData?.length) {
      const listingsArray = Object.keys(filteredData).map(
        (key) => filteredData[key]
      );

      if (this.state.filterRatingOrder === "asc") {
        listingsArray.sort((a, b) => {
          return parseInt(a.rating) - parseInt(b.rating);
        });
      }
      if (this.state.filterRatingOrder === "dsc") {
        listingsArray.sort((a, b) => {
          return parseInt(b.rating) - parseInt(a.rating);
        });
      }

      return listingsArray;
    }
  }

  render() {
    const { tenants } = this.props;
    console.log(tenants);
    const { listOfListings, favorites } = tenants;
    console.log(listOfListings);

    const { searchQuery, condition, filterGender, filterRatingOrder } =
      this.state;

    console.log(favorites);

    var filteredData = this.filterByGender(listOfListings?.result);
    filteredData = this.filterRatingByOrder(filteredData);

    console.log(filteredData);

    console.log(tenants);

    return (
      <>
        <Section>
          <Container>
            <Wrap>
              <Paper
                component="form"
                sx={{
                  width: "60%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search your properties"
                  inputProps={{ "aria-label": "search your properties" }}
                  value={searchQuery}
                  onChange={this.onChangeSearchQuery}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <FormControl fullwidth sx={{ marginLeft: "auto " }} size="small">
                <Select
                  displayEmpty
                  value={filterRatingOrder}
                  onChange={this.searchFilterRatingOrder}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="asc">Rating - Lowest to Highest</MenuItem>
                  <MenuItem value="dsc">Rating - Highest to Lowest</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullwidth sx={{ marginLeft: "5px" }} size="small">
                <Select
                  value={filterGender}
                  onChange={this.searchFilterGender}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Wrap>

            <GridCustom container alignItems="stretch" spacing={3}>
              {filteredData &&
                filteredData
                  ?.filter((item) =>
                    condition.some((newItem) => {
                      return (
                        item[newItem]
                          .toString()
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) > -1
                      );
                    })
                  )
                  .map((tenant, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                      <TenantListingCard
                        tenant={tenant}
                        favorites={favorites}
                      />
                    </Grid>
                  ))}
            </GridCustom>
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

function mapDispatchToProps(dispatch) {
  return {
    getAllListingsTenants: () => dispatch(getAllListingsTenants()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TenantExploreSection);
