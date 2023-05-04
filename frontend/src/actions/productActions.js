import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_REQUEST,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  GET_PRODUCT_REVIEW_FAIL,
  GET_PRODUCT_REVIEW_SUCCESS,
  GET_PRODUCT_REVIEW_REQUEST,
  DELETE_PRODUCT_REVIEW_REQUEST,
  DELETE_PRODUCT_REVIEW_FAIL,
  DELETE_PRODUCT_REVIEW_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstant";

//  action receives things from the backend

export const getAllProducts =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// action to be conected to a single product

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// adding a review

export const addReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/products/review",
      reviewData,
      config
    );

    dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// adding admin getting all products

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/products/adminProducts");

    dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// new product only by admin

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/products/admin",
      productData,
      config
    );

    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

// DELETE THE PRODUCT DONE BY ADMIN
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/products/admin/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update the product this can only be done products

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/products/admin/${id}`,
      productData,
      config
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get product review by the admin through query remember api/products/reviews?id={id}
export const getProductReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/products/reviews?id=${id}`);

    dispatch({ type: GET_PRODUCT_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete specific product
export const deleteProductReview =
  (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REVIEW_REQUEST });

      const { data } = await axios.delete(
        `/api/products/reviews?id=${reviewId}&productId=${productId}`
      );

      dispatch({ type: DELETE_PRODUCT_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
