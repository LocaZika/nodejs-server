const Product = require("../models/product");

module.exports = {
  index: async (req, res) => {
    // {brand, model, bodyStyle, transmission, fuelType, seats, keyword}
    const { brand, model, bodyStyle, transmission, fuelType, seats, keyword } = req.query;
    let query = {};
    if (req.query?.length !== true) {
      const products = await Product.find().sort({ price: "desc" });
      res.json(products);
    } else {
      const defBrand = brand ?? false;
      const defModel = model ?? false;
      const defBodyStyle = bodyStyle ?? false;
      const defTransmission = transmission ?? false;
      const defFuelType = fuelType ?? false;
      const defSeats = seats ?? false;
      const defKeyword = keyword ?? false;
      if (defBrand !== false) {
        query.brand = defBrand;
      }
      if (defModel !== false) {
        query.model = defModel;
      }
      if (defBodyStyle !== false) {
        query.bodyStyle = defBodyStyle;
      }
      if (defTransmission !== false) {
        query.transmission = defTransmission;
      }
      if (defFuelType !== false) {
        query.fuelType = defFuelType;
      }
      if (defSeats !== false) {
        query.seats = defSeats;
      }
      if (defKeyword !== false) {
        query.keyword = defKeyword;
      }
      const products = await Product.find(query).exec();
      res.json(products);
    }
  },
  get: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    res.json(product);
    res.status(404).send("Product not found");
  },
  post: async (req, res) => {
    const {
      name,
      price,
      brand,
      gearboxType,
      vin,
      stock,
      seats,
      model,
      bodyStyle,
      transmission,
      hp,
      mpg,
      yearOfManufacture,
      status,
      images,
      tabs,
    } = req.body;

    const response = await Product.create({
      name,
      price,
      brand,
      gearboxType,
      vin,
      stock,
      seats,
      model,
      bodyStyle,
      transmission,
      hp,
      mpg,
      yearOfManufacture,
      status,
      images,
      tabs,
    });
    res.json(response);
  },
  patch: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Must have the product id");
    } else {
      const data = req.body;
      const product = await Product.findByIdAndUpdate(id, data, { timestamps: true });
      res.status(200).json(product);
    }
  },
};
