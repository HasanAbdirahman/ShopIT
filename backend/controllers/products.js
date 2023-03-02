const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeautures = require("../utils/apifeautures");

module.exports = {
  createProduct,
  show,
  update,
  deleteProduct,
  index,
};

// WHEN YOU ARE CREATING, INDEX, UPDATE, delete U HAVE TO USE ASYNC/AWAIT COZ U DONT KNOW HOW Long IT WILL BE.
//  you have to use async/await when you are using the arrow function with the show function or else if it is the normal
// function you will get an error HENCE dont use async/await

// create a new product => api/products/admin
async function createProduct(req, res, next) {
  await Product.create(req.body, function (err, product) {
    if (err) {
      return next(new ErrorHandler("Product not found", 404));
    } else {
      res.status(201).json({
        success: true,
        product,
      });
    }
  });
}

// getting all the products => /api/products
// module.exports.index = async (req, res) => {
//   // this line shows when we are searching for a product eg api/products?keyword=apple
//   const apiFeatures = new APIFeautures(Product.find(), req.query).search();

//   let products = await apiFeatures.query;
//   res.status(200).json({
//     success: true,
//     counts: products.length,
//     products,
//   });
// };
async function index(req, res, next) {
  // the number of items that the page will have
  const resPerPage = 4;
  // countDocuments returns the number of documents in the collection
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeautures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  let products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    counts: products.length,
    products,
    productCount,
  });
}

// get single products => /api/products/:id
function show(req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) {
      return next(new ErrorHandler("Product not found", 404));
    } else {
      res.status(200).json({
        success: true,
        product,
      });
    }
  });
}
// module.exports.show = catchAsyncError(async (req, res, next) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });

// update products => /api/products/admin/:id
async function update(req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
}

// delete products => /api/products/admin/:id
async function deleteProduct(req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndRemove(req.params.id);
  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  }
}
