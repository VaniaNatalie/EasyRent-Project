const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const dotenv = require("dotenv");
dotenv.config();

const config = require("../config");

requireSignIn = asyncHandler(async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Not authorized! No token provided! " });
  } else {
    jwt.verify(token, config.jwtSecretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
});

renterAuth = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    // FORBIDDEN, refuse to authorize
    return res
      .status(403)
      .json({ message: "Not authorized! No token provided! " });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // unauthorized
        return res.status(401).json({ message: "Unauthorized!" });
      } else {
        if (decoded.role != "tenant") {
          return res
            .status(403)
            .json({ message: "Require Rental Searcher Role" });
        } else {
          next();
        }
      }
    });
  }
};

ownerAuth = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    // FORBIDDEN, refuse to authorize
    return res
      .status(403)
      .json({ message: "Not authorized! No token provided! " });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // unauthorized
        return res.status(401).json({ message: "Unauthorized!" });
      } else {
        if (decoded.role != "landlord") {
          return res
            .status(403)
            .json({ message: "Require Property Owner Role" });
        } else {
          next();
        }
      }
    });
  }
};

adminAuth = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    // FORBIDDEN, refuse to authorize
    return res
      .status(403)
      .json({ message: "Not authorized! No token provided! " });
  } else {
    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
      if (err) {
        // unauthorized
        return res.status(401).json({ message: "Unauthorized!" });
      } else {
        console.log(decoded);
        if (decoded.role != "admin") {
          return res.status(403).json({ message: "Require Admin Role" });
        } else {
          next();
        }
      }
    });
  }
};

const checkAuth = {
  requireSignIn,
  renterAuth,
  ownerAuth,
  adminAuth,
};

module.exports = checkAuth;
