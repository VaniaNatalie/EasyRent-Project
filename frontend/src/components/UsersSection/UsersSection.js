import React, { Component } from "react";
import { getAllUsersAdmin, deleteUser } from "../../actions/admin.actions";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Paper,
  Button,
  Typography,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Container } from "../../GlobalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Section } from "../PropertyList/PropertyList.elements";
import { WrapButtonCustom } from "../SingleListingView/SingleListingView.elements";
import DeleteIcon from "@mui/icons-material/Delete";
import { Wrap } from "../TenantExploreSection/TenantExploreSection.elements";

class UsersSection extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
    this.searchFilterRole = this.searchFilterRole.bind(this);
    this.filterByRole = this.filterByRole.bind(this);
    this.state = {
      searchQuery: "",
      condition: ["fullname", "email", "username"],
      filterRole: "",
    };
  }

  componentDidMount() {
    this.props.getAllUsersAdmin();
  }

  onChangeSearchQuery(e) {
    const searchQuery = e.target.value;
    this.setState({
      searchQuery: searchQuery,
    });
  }

  searchFilterRole(e) {
    const filterRole = e.target.value;
    this.setState({
      filterRole: filterRole,
    });
  }

  filterByRole(filteredData) {
    if (!this.state.filterRole) {
      return filteredData;
    }
    const filteredRoleList = filteredData?.filter((listing) => {
      return listing.role.split(" ").indexOf(this.state.filterRole) !== -1;
    });
    return filteredRoleList;
  }

  delete = (id) => {
    this.props.handleDelete(id);
  };

  render() {
    const { admin } = this.props;
    console.log(admin);
    const { users } = admin;
    console.log(users);

    const { searchQuery, condition, filterRole } = this.state;

    var filteredData = this.filterByRole(users?.result);
    console.log(filteredData);

    return (
      <>
        <Section>
          <WrapButtonCustom>
            <Typography>Users Data</Typography>
          </WrapButtonCustom>
          <Container>
            <Wrap>
              <Paper
                component="form"
                sx={{
                  width: "80%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search..." }}
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
                  value={filterRole}
                  onChange={this.searchFilterRole}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="tenant">Tenant</MenuItem>
                  <MenuItem value="landlord">Landlord</MenuItem>
                </Select>
              </FormControl>
            </Wrap>
            <TableContainer component={Paper} style={{ maxHeight: 550 }}>
              <Table sx={{ minWidth: 650 }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Fullname</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Mobile Phone</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData &&
                    filteredData
                      .filter((item) =>
                        condition.some((newItem) => {
                          return (
                            item[newItem]
                              .toString()
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) > -1
                          );
                        })
                      )
                      .map((user, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {user.fullname}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user?.gender}</TableCell>
                          <TableCell>{user?.mobile_phone}</TableCell>
                          <TableCell>
                            <Button>
                              <DeleteIcon
                                sx={{ color: "red" }}
                                onClick={() =>
                                  this.props.handleDelete(user._id)
                                }
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (id) => {
      dispatch(deleteUser(id));
      dispatch(getAllUsersAdmin());
    },
    getAllUsersAdmin: () => {
      dispatch(getAllUsersAdmin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersSection);
