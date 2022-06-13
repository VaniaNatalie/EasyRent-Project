import {
  RETRIEVE_ALL_LISTINGS,
  RETRIEVE_ALL_FAVORITES,
  DELETE_FAVORITES,
  RETRIEVE_SINGLE,
  ADD_FAVORITES,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_RESET,
  FILTER_BY_GENDER,
} from "../constants/tenant.constants";

const initialState = {
  listOfListings: [],
  favorites: [],
  singleListing: { reviews: [] },
};

export const tenantsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_ALL_LISTINGS:
      return {
        ...state,
        listOfListings: payload,
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      };
    case ADD_FAVORITES:
      return { ...state, favorites: [...(state.favorites || []), payload] };
    case DELETE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (listOfListings) => listOfListings.id !== payload.id
        ),
      };
    case RETRIEVE_ALL_FAVORITES:
      return payload;
    case RETRIEVE_SINGLE:
      return { singleListing: payload };

    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };
    case CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
