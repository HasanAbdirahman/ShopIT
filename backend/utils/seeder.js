const Product = require("../models/product");
const products = require("../data/products.json");

// setting up config path
require("dotenv").config();

// connect to the db
require("../config/database");

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted successfully");
    await Product.insertMany(products);
    console.log("Products are added successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seedProducts();
