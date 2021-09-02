var config = require("./config");

const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { name: user.name, id: user.id, accessLevel: user.accessLevel },
    config.JWT_SECRET,
    { expiresIn: 300 }
  );
  return accessToken;
};
const validateToken = (req, res, next) => {
  // const accessToken = req.cookies["access-token"];
  const accessToken = req.headers["x-access-token"];
  console.log("accessToken w validateToken", accessToken);
  if (!accessToken) {
    console.log("Uzytkownik nie posiada autoryzacji");
    return res.json({
      message: "Uzytkownik nie posiada autoryzacji",
      authenticated: false,
      errors: err,
    });
  }
  try {
    const validToken = verify(accessToken, config.JWT_SECRET);
    if (validToken) {
      console.log("autoryzacja powiodla sie!");
      // req.authenticated = true;
      return next();
    }
  } catch (err) {
    console.log("zly token");
    return res.json({ error: "nie posiadasz uprawnień!" });
  }
};
module.exports = { createTokens, validateToken };
