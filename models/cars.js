const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
    make: { type: String, required: true},
    model: { type: String, required: true},
    year: { type: Number, required: true},
    price: { type: Number, required: true},
    isDrivable: Boolean
});

const Cars = mongoose.model('Cars', carsSchema)

module.exports = Cars;