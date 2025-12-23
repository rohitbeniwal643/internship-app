const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

function generateToken(user) {
  const payload = { _id: user._id, email: user.email};
  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
}

function validateToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, validateToken };
