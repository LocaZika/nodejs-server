const mongoose = require("mongoose");
const { Schema } = mongoose;
// backup
// tabs: {
//   overview: {
//     title: String,
//     info: {
//       title: String,
//       items: Array,
//     },
//     feature: [
//       {
//         title: String,
//         items: Array,
//       },
//     ],
//   },
//   technical: {
//     title: String,
//     info: {
//       title: String,
//       items: Array,
//     },
//     feature: {
//       title: String,
//       items: Array,
//     },
//   },
//   featureAndOption: {
//     title: String,
//     info: {
//       title: String,
//       items: Array,
//     },
//     feature: {
//       title: String,
//       items: Array,
//     },
//   },
//   location: {
//     title: String,
//     info: {
//       title: String,
//       items: Array,
//     },
//     feature: {
//       title: String,
//       items: Array,
//     },
//   },
// },
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
  tabs: Object,
};

const productSchema = new Schema(product, { timestamps: true });
productSchema.index({ "$**": "text" });
module.exports = mongoose.model("Product", productSchema);
