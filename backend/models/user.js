const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Return JWT token
userSchema.methods.getjwtToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

module.exports = mongoose.model("User", userSchema);
