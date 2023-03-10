import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  // ALL_DETAILS_FAIL,
  // ALL_DETAILS_SUCCESS,
  // ALL_DETAILS_REQUEST,
  CLEAR_ERRORS,
} from "../constants/productConstant";

// reducer specifies how the state of the application changes in response to actions sent to the store to the store
// reducers are functions that take two arguments: the current state and an action as an arguement
//  and returns the next state of the application (previousState, action(function)) => newState

// actions are the only way my applications can interact with the store and they carry some information from your app to the redux store
//  Actions are plain js objects and have a "type" property that indicates the type of action being performed
// the type property is typically defined as astring constant

export const productReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        countProducts: action.payload.countProducts,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// product detail reducer
// export const productDetailReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case ALL_DETAILS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case ALL_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         product: action.payload,
//       };
//     case ALL_DETAILS_FAIL:
//       return {
//         ...state,
//         loading: false,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };
