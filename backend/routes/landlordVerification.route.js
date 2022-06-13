const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const multer = require("multer");
const {
  storeLandlordVerifiedImages,
} = require("../controllers/landlordVerification.controllers");
const { requireSignIn, ownerAuth } = require("../middleware/checkAuth");

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/landlordData/");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v1() + ".jpeg");
  },
});

const imageUpload = multer({ storage: Storage });

const multipleImage = imageUpload.fields([
  { name: "ktp_image", maxCount: 1 },
  { name: "selfie_image", maxCount: 1 },
]);

router.post("/landlordVerification", requireSignIn, [
  multipleImage,
  storeLandlordVerifiedImages,
]);

router.get("/getId", requireSignIn, function (req, res) {
  res.send(req.userId);
});

module.exports = router;
