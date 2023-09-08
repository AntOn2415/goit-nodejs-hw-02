const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, nodemailerConfig } = require("../../helpers");
const nodemailer = require("nodemailer");

require("dotenv").config();

const { BASE_URL } = process.env;

const transport = nodemailer.createTransport(nodemailerConfig);

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    from: "anton_hryhoriev@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  transport
    .sendMail(verifyEmail)
    .then(() => console.log("Email send success"))
    .catch(error => console.log(error.message));

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = ctrlWrapper(resendVerifyEmail);
