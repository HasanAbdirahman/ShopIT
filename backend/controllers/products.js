const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeautures = require("../utils/apifeautures");
const cloudinary = require("cloudinary");
// WHEN YOU ARE CREATING, INDEX, UPDATE, delete U HAVE TO USE ASYNC/AWAIT COZ U DONT KNOW HOW Long IT WILL BE.
//  you have to use async/await when you are using the arrow function with the show function or else if it is the normal
// function you will get an error HENCE dont use async/await

// create a new product => api/products/admin
async function createProduct(req, res, next) {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
}

async function index(req, res, next) {
  // the number of items that the page will have
  const resPerPage = 4;
  // countDocuments returns the number of documents in the collection
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeautures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  // Simply add clone like this if you want to execute the query second time,
  // as we are doing. After v6.0. you can execute second query like this:.  .clone()
  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    counts: products.length,
    products,
    filteredProductsCount,
    productsCount,
    resPerPage: resPerPage,
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

// update products => /api/products/admin/:id
async function update(req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // deleting the images assocated to the product
    for (let i = 0; i < product.images.length; i++) {
      let result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
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
  // deleting the images assocated to the product
  for (let i = 0; i < product.images.length; i++) {
    let result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    product,
  });
}

// create new review => api/product/createReview
async function createProductReview(req, res, next) {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user?.toString() === req.user?._id.toString()
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
}

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

// GET ALL PRODUCTS FOR ADMINS => api/products/adminProducts
const getAdminProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

// relatedProducts => /api/products/relatedProducts
const relatedProducts = async (req, res, next) => {
  // check the current product category
  const product = await Product.findById(req.params.id);
  //  find the category associated with the current product

  const currentCategory = product.find({ category });
  // when i found out the category now I have to look all the products and check which product has that category
  console.log(currentCategory);
  const allProducts = await Product.find({ category: currentCategory });
  // console.log("hassan" + allProducts);

  res.status(200).json({
    success: true,
    currentCategory,
    allProducts,
  });
};

module.exports = {
  show,
  createProduct,
  getAdminProducts,
  update,
  deleteProduct,
  index,
  relatedProducts,
  createProductReview,
  getProductReviews,
  deleteProductReview,
};
