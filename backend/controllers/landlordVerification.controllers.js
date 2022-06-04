const { Landlord } = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const storeLandlordVerifiedImages = asyncHandler(async (req, res) => {
  try {
    let image1 = req.files.ktp_image[0].path;
    let image2 = req.files.selfie_image[0].path;
    const landlord = await Landlord.findById(req.userId);
    if (landlord) {
      landlord.ktp_image = image1;
      landlord.selfie_image = image2;
      landlord.isVerified = true;
      const updated = await landlord.save();

      return res.status(201).json({
        message: "Your verification successfully added!",
        user: updated,
        accessToken: generateToken(updated._id),
      });
    } else {
      return res.status(404).json({ message: "Error occured!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong with the server!" });
  }
});

module.exports = { storeLandlordVerifiedImages };
