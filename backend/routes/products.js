const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/products");
const {
  isAutheticated,
  authorizedRoles,
} = require("../middlewares/authenticated");

// put   isAutheticated, back later
router.get("/", productCtrl.index);
router.post(
  "/admin",
  isAutheticated,
  authorizedRoles("admin"),
  productCtrl.createProduct
);

router.get("/reviews", isAutheticated, productCtrl.getProductReviews);

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

// this route creates a new review and updates the product as well see the controller interesting really
router.put("/review", isAutheticated, productCtrl.createProductReview);

// delete review
router.delete("/reviews", isAutheticated, productCtrl.deleteProductReview);

module.exports = router;
