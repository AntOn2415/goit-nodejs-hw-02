const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");
const { ctrlWrapper, nodemailerConfig } = require("../../helpers");

require("dotenv").config();

const { BASE_URL } = process.env;

const transport = nodemailer.createTransport(nodemailerConfig);

const verificationToken = nanoid();

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409);
    throw new Error("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    from: "anton_hryhoriev@meta.ua",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

  transport
    .sendMail(verifyEmail)
    .then(() => console.log("Email send success"))
    .catch(error => console.log(error.message));

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = ctrlWrapper(register);
