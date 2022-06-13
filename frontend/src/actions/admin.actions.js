import {
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  DELETE_USER,
} from "../constants/user.constants";
import { SET_MESSAGE } from "../constants/user.constants";
import axios from "axios";

export const getAllUsersAdmin = () => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };
  dispatch({ type: ADMIN_GET_ALL_USERS_REQUEST });
  return await axios.get("/api/admin/allUsers", config).then(
    (res) => {
      dispatch({ type: ADMIN_GET_ALL_USERS_SUCCESS, payload: res.data });
      console.log(res.data);
      return Promise.resolve();
    },
    (err) => {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      dispatch({
        type: ADMIN_GET_ALL_USERS_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const {
    userLogin: { user },
  } = getState();

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };

  return await axios
    .delete(`/api/admin/deleteUser/${id}`, config)
    .then(() => {
      dispatch({ type: DELETE_USER, payload: { id } });
    })
    .catch((err) => {
      console.log(err);
    });
};
