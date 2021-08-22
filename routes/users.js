var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var sha512 = require("js-sha512");

const { createTokens, validateToken } = require("../JWT");

const User = require("../models/user");

router.get("/", function (req, res, next) {
  res.json({ title: "uzytkownik" });
});

//=============================Register=====================================================
router.post("/register", (req, res) => {
  const { name, surname, email, password, password2 } = req.body;

  let errors = [];

  if (!name || !surname || !email || !password || !password2) {
    errors.push({ message: "Prosze wypelnic wszystkie pola" });
  }

  if (password !== password2) {
    errors.push({ message: "Hasla roznia sie od siebie" });
  }

  if (password.length < 6) {
    errors.push({ message: "Haslo musi zawierac conajmniej 6 znaków" });
  }

  if (errors.length > 0) {
    res.json({
      errors,
      name,
      surname,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ message: "Uzytkownik o podanym meilu istnieje" });
        res.json({
          errors,
          name,
          surname,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          surname,
          email,
          password,
        });
        newUser.password = sha512(newUser.password);
        newUser
          .save()
          .then((user) => {
            res.json({ message: "Udalo Ci sie zarejestrowac" });
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

//====================================login===========================================================

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashpassword = sha512(password);

  let errors = [];

  if (!email) {
    errors.push({ message: "Prosze wpisac email" });
  }
  if (!password) {
    errors.push({ message: "Prosze wpisac haslo" });
  }

  if (errors.length > 0) {
    res.json({
      errors,
      email,
      password: "",
    });
  } else {
    const user = User.findOne({ email: email, password: hashpassword }).then(
      (user) => {
        if (!user) {
          errors.push({ message: "błędny login lub hasło" });
          res.json({
            islogged: null,
            accessLevel: 0,
            authenticated: false,
            errors,
            email,
            password: "",
            message: "Nie udało sie zalogować",
          });
        } else {
          req.session.user = user;

          const accessToken = createTokens(user);

          accessLevel = user.accessLevel;
          user.password = null;
          res.json({
            islogged: true,
            message: "Udalo CI sie zalogować!",
            accessLevel,
            authenticated: true,
            accessToken: accessToken,
            user: user,
          });
        }
      }
    );
  }
});

//===================================logout===================================================

router.get("/logout", (req, res) => {
  res.json({
    message: "Zostales wylogowany",
    islogged: false,
    accessLevel: 0,
  });
});

module.exports = router;
