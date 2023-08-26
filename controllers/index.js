const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateUserSubscription = require("./updateUserSubscription");
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
};
