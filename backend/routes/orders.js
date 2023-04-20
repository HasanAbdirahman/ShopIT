const express = require("express");
const router = express.Router();
const {
  isAutheticated,
  authorizedRoles,
} = require("../middlewares/authenticated");

const ordersCtrl = require("../controllers/orders");

router.get("/me", isAutheticated, ordersCtrl.getLoggedInUserOrders);
router.get("/:id", isAutheticated, ordersCtrl.getSingleOrder);
router.post("/new", isAutheticated, ordersCtrl.createOrder);
router.get(
  "/admin/orders",
  isAutheticated,
  authorizedRoles("admin"),
  ordersCtrl.allOrders
);

router.put(
  "/admin/updateOrder/:id",
  isAutheticated,
  authorizedRoles("admin"),
  ordersCtrl.updateOrder
);
router.delete(
  "/admin/deleteOrder/:id",
  isAutheticated,
  authorizedRoles("admin"),
  ordersCtrl.deleteOrder
);
module.exports = router;
