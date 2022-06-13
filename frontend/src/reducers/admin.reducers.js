import {
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  DELETE_USER,
} from "../constants/user.constants";

export const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_USERS_REQUEST:
      return { loading: true };
    case ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case ADMIN_GET_ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_USER:
      const newList = state.filter((user) => user.id !== action.payload.id);
      return newList;
    default:
      return state;
  }
};
