const ErrorHandler = require("./utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // Wrong Mongoose ObjectID error enters wrong id in the eg => api/products/{wrong _id}
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // handling Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Objects.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }
    // handling wrong JWT erorr error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try again";
      error = new ErrorHandler(message, 400);
    }
    // handling expired JWT ERROR
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token HAS EXPIRED. Try again";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
