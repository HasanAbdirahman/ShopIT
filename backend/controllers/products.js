const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeautures = require("../utils/apifeautures");

// WHEN YOU ARE CREATING, INDEX, UPDATE, delete U HAVE TO USE ASYNC/AWAIT COZ U DONT KNOW HOW Long IT WILL BE.
//  you have to use async/await when you are using the arrow function with the show function or else if it is the normal
// function you will get an error HENCE dont use async/await

// create a new product => api/products/admin
async function createProduct(req, res, next) {
  req.body.user = req.user.id;
  console.log("hasan" + req.body.user);

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

// create new review => api/product/createReview
const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//  get product reviews => api/products/reviews

const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete product review  make the user created it is the one that can delete it => api/product/deleteReview
//  we have to pass the id of the review andid of the product
const deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(product);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createProduct,
  show,
  update,
  deleteProduct,
  index,
  createProductReview,
  getProductReviews,
  deleteProductReview,
};
