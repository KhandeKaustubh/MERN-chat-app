const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const generatetoken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: "31d" });
};

module.exports = generatetoken;







