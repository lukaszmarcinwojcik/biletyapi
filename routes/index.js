const express = require("express");
const router = express.Router();
const config = require("../config");
const Flight = require('../models/flight');
const Seat = require('../models/seat');





router.get("/flight", (req, res) => {
  Flight.find({}, (err, flightList) => {
    res.json(flightList);
  });
});
router.get("/seat", (req, res) => {


  let Out = Seat;
      Out = Out.find({});
      Out.sort({ _id: 1 });
      Out.exec((err, seatList) => {
        res.json(seatList);
      });
});
//flight find
router.post("/flightfind", (req, res) => {
  const { departure, arrival } = req.body;
  let Out = Flight;
  console.log(departure," oraz ",arrival);

  Out=Out.findOne({ departure: departure, arrival: arrival }).then(
    (flightData) => {
      res.json(flightData)
    });
  
});


module.exports = router;
