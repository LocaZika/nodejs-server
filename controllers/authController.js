const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessTolen, decodedAccessTolen } = require("../helpers/jwt");
const saltRounds = 10;

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password.toString(), saltRounds, async (err, hash) => {
      const user = await User.create({
        username,
        email,
        password: hash,
        verification: 0,
      });
      res.json(user);
    });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
  },
};
