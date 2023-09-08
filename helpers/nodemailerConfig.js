require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "anton_hryhoriev@meta.ua",
    pass: META_PASSWORD,
  },
};

module.exports = nodemailerConfig;
