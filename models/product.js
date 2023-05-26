const mongoose = require("mongoose");
const { Schema } = mongoose;

const product = {
  name: String,
  brand: String,
  price: Number,
  gearboxType: String,
  vin: String,
  stock: String,
  seats: Number,
  model: String,
  bodyStyle: String,
  transmission: String,
  hp: Number,
  mpg: Number,
  yearOfManufacture: Number,
  status: String,
  images: Array,
  createAt: Date,
  updateAt: Date,
  tabs: {
    overview: {
      title: String,
      info: {
        title: String,
        items: Array,
      },
      feature: [
        {
          title: String,
          items: Array,
        },
      ],
    },
    technical: {
      title: String,
      info: {
        title: String,
        items: Array,
      },
      feature: {
        title: String,
        items: Array,
      },
    },
    featureAndOption: {
      title: String,
      info: {
        title: String,
        items: Array,
      },
      feature: {
        title: String,
        items: Array,
      },
    },
    location: {
      title: String,
      info: {
        title: String,
        items: Array,
      },
      feature: {
        title: String,
        items: Array,
      },
    },
  },
};

const productSchema = new Schema(product, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
