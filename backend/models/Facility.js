const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    name: String,
    type: String,
    zipCode: Number,
    capacity: String
});

module.exports = mongoose.model('Facility', FacilitySchema);
