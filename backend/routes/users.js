const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
const { isAutheticated } = require("../middlewares/authenticated");

router.post("/register", userCtrl.registerUser);
router.post("/login", userCtrl.loginUser);
router.get("/logout", userCtrl.logout);
// resetting and forget password happens when a person is outside and wants to log in
router.post("/password/forgot", userCtrl.forgotPassword);
router.put("/password/reset/:token", userCtrl.resetPassword);
router.get("/me", isAutheticated, userCtrl.getUserProfile);
// This happens when a person already inside and logged in
router.put("/password/update", isAutheticated, userCtrl.updatePassword);
router.put("/me/update", isAutheticated, userCtrl.updateProfile);

// admin routes
router.get("/admin/users", isAutheticated, userCtrl.allusers);
router.get("/admin/user/:id", isAutheticated, userCtrl.getUserDetail);
router.put("/admin/user/:id", isAutheticated, userCtrl.updateUser);
router.delete("/admin/user/:id", isAutheticated, userCtrl.deleteUser);

module.exports = router;
