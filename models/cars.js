const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  price: { type: Number },
  isDrivable: Boolean,
});

const Cars = mongoose.model("Cars", carsSchema);

module.exports = Cars;
