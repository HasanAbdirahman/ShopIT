const express = require("express");
const router = express.Router();
const paymentCtrl = require("../controllers/payment");
const {
  isAutheticated,
  authorizedRoles,
} = require("../middlewares/authenticated");

router.get("/stripeapi", isAutheticated, paymentCtrl.sendStripApi);
router.post("/payment/process", isAutheticated, paymentCtrl.processPayment);

module.exports = router;
