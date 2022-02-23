const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleMakesAndTypes: {
    type: Object,
    required: true,
  },
});

// Export User model
module.exports = mongoose.model('Vehicle', vehicleSchema);
