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
    errors.push({ message: "Proszę wypełnić wszystkie pola" });
  }

  if (password !== password2) {
    errors.push({ message: "Hasła różnią się od siebie" });
  }

  if (password.length < 6) {
    errors.push({ message: "Hasło musi zawierać conajmniej 6 znaków" });
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
        errors.push({ message: "Użytkownik o podanym emailu istnieje" });
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
            res.json({ message: "Udało Ci się zarejestrować" });
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
    errors.push({ message: "Proszę wpisać email" });
  }
  if (!password) {
    errors.push({ message: "Proszę wpisać hasło" });
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
          errors.push({ message: "Błędny login lub hasło" });
          res.json({
            islogged: false,
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
            message: "Udało Ci się zalogować!",
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
    message: "Zostałeś wylogowany",
    islogged: false,
    accessLevel: 0,
  });
});

module.exports = router;
