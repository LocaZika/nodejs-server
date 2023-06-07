const Product = require("../models/product");

module.exports = {
  index: async (req, res) => {
    // {brand, model, bodyStyle, transmission, fuelType, seats, keyword}
    const { brand, model, bodyStyle, transmission, fuelType, seats, keyword, limit, page } =
      req.query;
    const defLimit = limit ?? 9;

    const start = (page - 1) * defLimit;

    let query = {};
    const selectedFields = {
      name: 1,
      gearboxType: 1,
      mpg: 1,
      hp: 1,
      yearOfManufacture: 1,
      images: 1,
      status: 1,
      price: 1,
    };

    if (!req.query) {
      // console.log("a");
      //get all
      const count = await Product.find().count();

      const products = await Product.find()
        .select(selectedFields)
        .limit(defLimit)
        .skip(start ?? 0)
        .sort({ price: "desc" })
        .exec();

      res.json({
        count: count,
        data: products,
      });
    } else {
      const defBrand = brand ?? "";
      const defModel = model ?? false;
      const defBodyStyle = bodyStyle ?? false;
      const defTransmission = transmission ?? false;
      const defFuelType = fuelType ?? false;
      const defSeats = seats ?? false;
      const defKeyword = keyword ?? false;
      if (defBrand !== "") {
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
      if (defKeyword !== false && defKeyword !== "") {
        query.keyword = defKeyword;
      }
      const count = await Product.find(query).count();
      const products = await Product.find(query)
        .select(selectedFields)
        .limit(defLimit)
        .skip(start ?? 0)
        .sort({ price: "desc" })
        .exec();
      res.json({
        count: count,
        data: products,
      });
    }
  },
  get: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    if (product) {
      res.json(product);
      console.log("a");
    } else {
      console.log("b");
      res.status(404).send("Product not found");
      return;
    }
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
