const { User } = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../helpers");

const updateUserSubscription = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;

  const allowedSubscriptions = ["starter", "pro", "business"];
  if (!allowedSubscriptions.includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, { subscription }, { new: true });

  if (!updatedUser) {
    throw HttpError(404, "User not found");
  }

  res.json(updatedUser);
};

module.exports = ctrlWrapper(updateUserSubscription);
