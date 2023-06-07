const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE } = process.env;

const generateAccessToken = (data) =>
  jwt.sign({ data }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE * 1000 });
const decodedAccessToken = (token) => jwt.verify(token, ACCESS_TOKEN_SECRET);
module.exports = { generateAccessToken, decodedAccessToken };
