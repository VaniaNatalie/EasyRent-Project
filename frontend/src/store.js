import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  changePasswordReducer,
} from "./reducers/auth";

import {
  faceMatchReducer,
  verifiedUserReducer,
  listingsReducer,
} from "./reducers/post.reducers";

import {
  tenantsReducer,
  createReviewReducer,
} from "./reducers/tenant.reducers";

import messageReducers from "./reducers/message.reducers";
import dataReducers from "./reducers/data.reducers";
import { adminReducer } from "./reducers/admin.reducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  changePass: changePasswordReducer,
  faceMatch: faceMatchReducer,
  userVerifiedStatus: verifiedUserReducer,
  listings: listingsReducer,
  tenants: tenantsReducer,
  admin: adminReducer,
  listingReview: createReviewReducer,
  message: messageReducers,
  data: dataReducers,
});

const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const userFavorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

const userLoggedIn = localStorage.getItem("isLoggedIn")
  ? JSON.parse(localStorage.getItem("isLoggedIn"))
  : false;

const initialState = {
  userLogin: { user: userInfoFromStorage, loggedIn: userLoggedIn },
  tenants: { favorites: userFavorites, listOfListings: {} },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
