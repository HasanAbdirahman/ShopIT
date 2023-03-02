// we are storing our token in the cookies but not the local storage which is not good
// we create and send token and save in the cookie

const sendToken = (user, statusCode, res) => {
  // creat jwt token
  const token = user.getjwtToken();

  // options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // cookie is not accessible from javascript hence required
  };
  //   remember this the first token is the name and the next token is the value
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
module.exports = sendToken;
