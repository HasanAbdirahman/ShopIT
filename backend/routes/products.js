const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/products");
const {
  isAutheticated,
  authorizedRoles,
} = require("../middlewares/authenticated");

router.get("/", isAutheticated, authorizedRoles("admin"), productCtrl.index);
router.post("/admin", isAutheticated, productCtrl.createProduct);
router.get("/:id", productCtrl.show);
router.put("/admin/:id", isAutheticated, productCtrl.update);
router.delete("/admin/:id", isAutheticated, productCtrl.deleteProduct);

module.exports = router;
