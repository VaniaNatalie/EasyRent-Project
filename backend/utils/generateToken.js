const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.jwtSecretKey, {
    expiresIn: "2h",
  });
};

module.exports = generateToken;
