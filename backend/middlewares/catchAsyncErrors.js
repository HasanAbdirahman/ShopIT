// this middleware help us if we send a paramater eg name in the model through postman
// that is required not from the frontend but we are protecting the backend
module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
