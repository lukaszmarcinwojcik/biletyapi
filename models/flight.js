var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const flightSchema = new Schema({
  departure: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    require: true,
  },
  departureTime:{
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },
  extraBaggagePrice: {
    type: Number,
    require: true,
  },
  flightType: {
    type: String,
    require: true,
  },

  arrivalTime: {
    type: String,
    require: true,
  },
});


module.exports = mongoose.model("Flight", flightSchema);
