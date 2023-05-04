import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REVIEW_REQUEST,
  DELETE_PRODUCT_REVIEW_FAIL,
  DELETE_PRODUCT_REVIEW_RESET,
  DELETE_PRODUCT_REVIEW_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  GET_PRODUCT_REVIEW_FAIL,
  GET_PRODUCT_REVIEW_SUCCESS,
  GET_PRODUCT_REVIEW_REQUEST,
  CLEAR_ERRORS,
} from "../constants/productConstant";

// reducer specifies how the state of the application changes in response to actions sent to the store to the store
// reducers are functions that take two arguments: the current state and an action as an arguement
//  and returns the next state of the application (previousState, action(function)) => newState

// actions are the only way my applications can interact with the store and they carry some information from your app to the redux store
//  Actions are plain js objects and have a "type" property that indicates the type of action being performed
// the type property is typically defined as a string constant

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProducts: action.payload.filteredProductsCount,
      };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
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
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
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
// creating product this is done only by admin => api/products/admin

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_PRODUCT_FAIL:
      return {
        ...state,
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
export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case PRODUCT_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

// DELETE AND UPDATE REDUCER ONLY DONE BY ADMIN
export const deleteUpdateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
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

// get reviews for the admin
export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case GET_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
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

//DELETE product review

export const deleteProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_PRODUCT_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case DELETE_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
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
