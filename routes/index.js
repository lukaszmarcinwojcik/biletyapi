const express = require("express");
const router = express.Router();
const config = require("../config");

// const Product = require("../models/product");
// const Type = require("../models/type");
// const FurnitureCollection = require("../models/furnitureCollection");
// const Material = require("../models/material");
// const Room = require("../models/room");

router.get("/", (req, res) => {
  res.json({ title: "strona glowna" });
});
router.get("/Dziala", (req, res) => {
  res.json({ title: "Dziala", body: "ale slabo" });
});

// router.post("/login", (req, res) => {
//   const body = req.body;

//   if (body.login === config.login && body.password === config.password) {
//     req.session.admin = 1;
//     res.json({
//       loginMessage: "Udalo Ci się zalogować",
//       islogged: true,
//       accessLevel: 3,
//     });
//   } else {
//     res.json({
//       loginMessage: "Nieprawidlowy login lub haslo",
//       islogged: false,
//       accessLevel: 0,
//     });
//   }
// });

// router.get("/logout", (req, res) => {
//   req.session.admin = null;
//   res.json({
//     loginMessage: "Zostales wylogowany",
//     islogged: false,
//     accessLevel: 0,
//   });
// });

router.get("/productList", (req, res) => {
  Product.find({}, (err, productList) => {
    res.json(productList);
  });
});

// router.get("/collectionList", (req, res) => {
//   FurnitureCollection.find({}, (err, collectionList) => {
//     res.json(collectionList);
//   });
// });

// router.get("/materialList", (req, res) => {
//   Material.find({}, (err, materialList) => {
//     res.json(materialList);
//   });
// });

// router.get("/roomList", (req, res) => {
//   Room.find({}, (err, roomList) => {
//     res.json(roomList);
//   });
// });

// router.get("/typeList", (req, res) => {
//   Type.find({}, (err, typeList) => {
//     res.json(typeList);
//   });
// });

// router.get("/filter", (req, res) => {
//   const type = req.query.type;
//   const furnitureCollection = req.query.collection;
//   const material = req.query.material;
//   const room = req.query.room;

//   if (
//     type === "" &&
//     furnitureCollection === "" &&
//     material === "" &&
//     room === ""
//   ) {
//     res.redirect("/productList");
//   }
//   let Out = Product;
//   if (type) {
//     Out = Out.find({
//       type: type,
//     });
//   }
//   if (furnitureCollection) {
//     Out = Out.find({
//       furnitureCollection: furnitureCollection,
//     });
//   }
//   if (material) {
//     Out = Out.find({
//       material: material,
//     });
//   }
//   if (room) {
//     Out = Out.find({
//       room: room,
//     });
//   }
//   Out.sort({ date: -1 });
//   Out.exec((err, productList) => {
//     res.json(productList);
//   });
// });

module.exports = router;
