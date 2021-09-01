var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const seatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isTaken: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("Seat", seatSchema);
