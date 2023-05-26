const User = require("../models/user");

module.exports = {
  index: async (req, res) => {
    const user = await User.find().exec();
    res.json(user);
  },
  get: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).exec();
    res.json(user);
    // res.status(404).send("User not found");
  },
  post: async (req, res) => {
    const { name, email, password } = req.body;

    const response = await User.create({
      name,
      email,
      password,
    });
    res.json(response);
  },
  patch: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Must have the product id");
    } else {
      const data = req.body;
      const user = await User.findByIdAndUpdate(id, data, { timestamps: true });
      res.status(200).json(user);
    }
  },
};
