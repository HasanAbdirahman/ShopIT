// Error Handldler class
class ErrorHandler extends Error {
  // errorHandler class constructor want statuscode and message and message is from ERROR
  constructor(message, statusCode) {
    // super constructor gives us access to the original Error class' arguement that was inherited-
    super(message);
    this.statusCode = statusCode;

    // captureStackTrace comes with the stack trace from the Error class
    // want the object which is "this" and and function which is "this.constructor"

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;
