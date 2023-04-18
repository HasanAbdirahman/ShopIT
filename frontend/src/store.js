// i replaced createStore to configureStore

// STORE ADVANTAGES:
// redux store brings the action and the reducer together
// use to hold application state and allow access to state via getState(),
// Store also dispatches actions that allows state to be updated via dispatch(action)
// store allows our application to register listeners via subscribe(listener)
// store also handles unregistering of listeners via the function returned by subscribe(listener)
import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/authReducers";

import { cartReducer } from "./reducers/cartReducers";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: authReducer,
  users: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

// reducer initial state
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
