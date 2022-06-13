const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOpt = {
  origin: "http://localhost:3000/",
};

// routes
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const listingrouter = require("./routes/listings.route");
const landlordVerification = require("./routes/landlordVerification.route");
const tenantRoutes = require("./routes/tenant.route");

app.use(cors(corsOpt));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api/listing", listingrouter);
app.use("/api/landlordVerified", landlordVerification);
app.use("/api/tenants", tenantRoutes);
app.use("/api/admin", userRoutes);

module.exports = app;
