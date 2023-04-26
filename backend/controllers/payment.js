const catchAsyncError = require("../middlewares/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// the api key is passed in front end
console.log("key " + process.env.STRIPE_SECRET_KEY);

// process stripe payment => api/v1/payment/process
const processPayment = catchAsyncError(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// sending stripe api key => api/v1/stripeapi
const sendStripApi = catchAsyncError(async function (req, res, next) {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

module.exports = {
  processPayment,
  sendStripApi,
};
