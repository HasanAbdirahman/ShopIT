const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
      trim: true,
      maxLength: [100, "Product cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the price"],
      trim: true,
      maxLength: [5, "Product cannot exceed 5 characters"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "Please enter the description"],
      trim: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    //   we are going to use a cloudinary image and upload it to cloudinary and gives a lot of response
    // and what it needs is image id also called publc id and url of that image
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter the category of this product"],
      enum: {
        values: [
          "Electronics",
          "Headphones",
          "Laptops",
          "Accessories",
          "Books",
          "Food",
          "Clothes/Shoes",
          "Beauty/Health",
          "Sports",
          "Outdoor",
          "Cameras",
          "Home",
        ],
        message: "Please select the correct category for product",
      },
    },
    seller: {
      type: String,
      required: [true, "Please enter the seller of this product"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock of this product"],
      maxLength: [5, "Product cannot exceed 5 characters"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
