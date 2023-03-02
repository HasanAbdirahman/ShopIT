const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

router.post("/", userCtrl.registerUser);
router.post("/login", userCtrl.loginUser);
router.get("/logout", userCtrl.logout);

module.exports = router;
