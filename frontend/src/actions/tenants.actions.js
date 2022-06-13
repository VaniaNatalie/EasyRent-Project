import {
  RETRIEVE_ALL_LISTINGS,
  ADD_FAVORITES,
  RETRIEVE_ALL_FAVORITES,
  DELETE_FAVORITES,
  RETRIEVE_SINGLE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FILTER_BY_GENDER,
  SEARCH_BY_VALUE,
} from "../constants/tenant.constants";
import { SET_MESSAGE } from "../constants/user.constants";

import axios from "axios";

export const getAllListingsTenants = () => async (dispatch) => {
  return await axios.get(`/api/listing/getAllListings`).then(
    (res) => {
      console.log(res.data);
      dispatch({ type: RETRIEVE_ALL_LISTINGS, payload: res.data });
      return Promise.resolve();
    },
    (err) => {
      console.log(err);
      return Promise.reject();
    }
  );
};

export const getIndividuals = (id) => {
  return function (dispatch, getState) {
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: user.accessToken,
      },
    };

    axios.get(`/api/listing/${id}`, config).then(
      (res) => {
        console.log(res.data.result);
        dispatch({ type: RETRIEVE_SINGLE, payload: res.data.result });
        return Promise.resolve();
      },
      (err) => {
        console.log(err);
        return Promise.reject();
      }
    );
  };
};

export const deleteFavorites = (id) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };

  return await axios
    .delete(`/api/tenants/${id}`, config)
    .then(() => {
      dispatch({ type: DELETE_FAVORITES, payload: { id } });
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject();
    });
};

export const listingFavorites = (id) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();

  return await axios
    .post(`/api/tenants/${id}`, null, {
      headers: { Authorization: user.accessToken },
    })
    .then(() => {
      dispatch({ type: ADD_FAVORITES, payload: { id } });
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject();
    });
};

export const getAllFavorites = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };

  return await axios
    .get(`/api/tenants/getAllFavorites`, config)
    .then((res) => {
      dispatch({ type: RETRIEVE_ALL_FAVORITES, payload: res.data });
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject();
    });
};

export const createListingReview =
  (listingId, review) => async (dispatch, getState) => {
    dispatch({ type: CREATE_REVIEW_REQUEST });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: user.accessToken,
      },
    };

    return await axios
      .post(`/api/listing/${listingId}/review`, review, config)
      .then(
        () => {
          dispatch({ type: CREATE_REVIEW_SUCCESS });
          return Promise.resolve();
        },
        (err) => {
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

          dispatch({
            type: CREATE_REVIEW_FAIL,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          return Promise.reject();
        }
      );
  };

export const sortByGender = (payload) => ({
  type: FILTER_BY_GENDER,
  payload,
});

export const filterByValue = (payload) => ({
  type: SEARCH_BY_VALUE,
  payload,
});
