const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// creating new order =>api/order
const createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  if (!order) {
    return next(new ErrorHandler("Something went wrong", 500));
  }
  res.status(200).json({
    status: "success",
    order,
  });
});

// getting sing order by id => /api/orders/:id

const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orders => api/orders/me/ getting the order of the person that is logged in

const getLoggedInUserOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    order,
  });
});

// get all orders => /api/orders/admin/orders = ADMIN ALONE
const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// UPDATE  / PROCESS ORDER  => /api/order/admin/orders = ADMIN ALONE CAN DO THIS
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered", 400));
  }
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  res.status(200).json({
    success: true,
    totalAmount,
    order,
  });
});

module.exports = {
  getSingleOrder,
  createOrder,
  getLoggedInUserOrders,
  allOrders,
};
