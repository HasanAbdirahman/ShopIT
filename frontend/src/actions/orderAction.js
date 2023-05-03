import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_FAIL,
  MY_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ORDERS_DETAIL_FAIL,
  ORDERS_DETAIL_REQUEST,
  ORDERS_DETAIL_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
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

// all orders only for admin => /api/order/admin/orders

export const allOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/order/admin/orders`);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, error: error.response.data.message });
  }
};

// update the order only done by the admin // "/api/order/admin/updateOrder/:id"
export const updateOrderAction = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: { "Content-type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/order/admin/updateOrder/${id}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, error: error.response.data.message });
  }
};
// delete orde oly by admin
export const deleteOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/order/admin/deleteOrder/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, error: error.response.data.message });
  }
};

// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
