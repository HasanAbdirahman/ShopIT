import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDERS_DETAIL_FAIL,
  ORDERS_DETAIL_REQUEST,
  ORDERS_DETAIL_SUCCESS,
  MY_ORDERS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstant";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

// Get currently logged i user orders => api/orders/me
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await axios.get("/api/order/me");

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, error: error.response.data.message });
  }
};

// get order detail
export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_DETAIL_REQUEST });

    const { data } = await axios.get(`api/order/${id}`);

    dispatch({
      type: ORDERS_DETAIL_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({ type: ORDERS_DETAIL_FAIL, error: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
