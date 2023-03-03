const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/products");
const {
  isAutheticated,
  authorizedRoles,
} = require("../middlewares/authenticated");

router.get("/", isAutheticated, productCtrl.index);
router.post(
  "/admin",
  isAutheticated,
  authorizedRoles("admin"),
  productCtrl.createProduct
);
router.get("/:id", productCtrl.show);
router.put(
  "/admin/:id",
  isAutheticated,
  authorizedRoles("admin"),
  productCtrl.update
);
router.delete(
  "/admin/:id",
  isAutheticated,
  authorizedRoles("admin"),
  productCtrl.deleteProduct
);

module.exports = router;
