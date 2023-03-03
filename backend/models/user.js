const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Name must be less than 30 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // disable password select
    trim: true,
  },
  //   cloudinary
  avatar: {
    public_id: {
      type: String,
      required: [true, "Please enter your public id"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Please enter your url"],
      trim: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// you cannot use the arrow function here bcoz we are using "this" if we use the arrow function
// what happens is that "this" is going to give us undefined
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// comparing passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token dont use arrow function
userSchema.methods.getjwtToken = function () {
  let hasan = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
  console.log(this._id);
  return hasan;
};
// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // generate token crypto generate s random bytes and its buffer hence use tostring
  const resetToken = crypto.randomBytes(20).toString("hex");

  // encrypt token by hashing and set it to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  // we are reset token the way it is but when we are storing it needs to be encrypted
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
