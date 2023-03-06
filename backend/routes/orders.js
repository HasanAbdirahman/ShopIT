const express = require("express");
const router = express.Router();
const {
  isAutheticated,
  authorizedRoles,
} = require("../middlewares/authenticated");

const ordersCtrl = require("../controllers/orders");

router.get("/me", isAutheticated, ordersCtrl.getLoggedInUserOrders);
router.get("/:id", isAutheticated, ordersCtrl.getSingleOrder);
router.post("/", isAutheticated, ordersCtrl.createOrder);
router.get(
  "/admin/orders",
  isAutheticated,
  authorizedRoles("admin"),
  ordersCtrl.allOrders
);

module.exports = router;
