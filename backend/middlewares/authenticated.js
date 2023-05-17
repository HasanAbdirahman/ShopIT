const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

// checking if theperson is logged in
const isAutheticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);
  next();
});

// handling user roles

const authorizedRoles = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  authorizedRoles,
  isAutheticated,
};
