const register = require("./register");
const login = require("./login");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateUserSubscription = require("./updateUserSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerifyEmail,
  getCurrent,
  logout,
  updateUserSubscription,
  updateAvatar,
};
