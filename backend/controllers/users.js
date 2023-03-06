const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendMailer = require("../utils/sendEmails");
const crypto = require("crypto");

// REGISTER USER => api/user/register
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kccvibpsuiusmwfepb3m",
      url: "https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png",
    },
  });

  sendToken(user, 200, res);
});

// Login user => api/user/login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //   check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  // finding user's email exist
  const user = await User.findOne({ email }).select("+password");

  // checking if the password matches
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Forgit password => api/user/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // crete reset password url this is the link he is going to use to reset the password
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/password/reset/${resetToken}`;

  const message = `Your Password reset token is as follows:\n\n${resetUrl}\n\n If you did not make this request, please ignore `;
  try {
    await sendMailer({
      email: user.email,
      subject: "ShopIT password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password => api/users/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  //  hash the url token remember when we are doing getresetpasswordtoken in the user model
  // we did not return the hashed token in the response but stored the hashed token
  // what we are going to do is hash the url token and compare it with the hashed token
  // that we stored in the database

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // comparing
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // no user found
  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  // password does not match the confirm password
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  // set up the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // saving the user
  await user.save();

  sendToken(user, 200, res);
});

// getting current;ly logged in user => api/users/me
const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// update / change password => api/users/password/update
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // check the previous password
  const isMatched = user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password does not match", 400));
  }
  user.password = req.body.password;
  // save the new password
  await user.save();

  // since we are changing the password we need to update the token
  sendToken(user, 200, res);
});

// update profile => api/users/me/update
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update Avatar TODO

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

// logout user => api/user/logout
const logout = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// ADMIN routes

// get all users => /api/users/admin/users
const allusers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

// get user details => /api/users/admin/user/:id

const getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // first check if the user does not exists
  if (!user) {
    return next(
      new ErrorHandler("User is not found with the id " + req.params.id, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update user profile => /api/users/admin/user/:id

const updateUser = catchAsyncErrors(async (req, res, next) => {
  const changeData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.params.id, changeData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
  });
});

// deleting by admin => /api/users/admin/user/:id

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler("User is not found with the id " + req.params.id, 404)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  allusers,
  updateProfile,
  getUserDetail,
  updateUser,
  deleteUser,
};
