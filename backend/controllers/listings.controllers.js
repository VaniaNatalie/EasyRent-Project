const { Listing } = require("../models/listings.model");
const asyncHandler = require("express-async-handler");

// Add Listing
const PostListing = asyncHandler(async (req, res) => {
  try {
    const {
      listingName,
      address,
      district,
      ward,
      city,
      postcode,
      price,
      facilities,
      gender,
      size,
    } = req.body;
    let userId = req.userId;

    let image1 = req.files.housephotos[0].path.slice(8);
    let image2 = req.files.housecertif[0].path.slice(8);

    await Listing.create({
      listingName: listingName,
      address: address,
      district: district,
      ward: ward,
      city: city,
      postcode: postcode,
      price: price,
      gender: gender,
      size: size,
      listedAt: Date.now(),
      facilities: facilities,
      housephotos: image1,
      housecertif: image2,
      userId: userId,
    }).then((result) => {
      return res.status(201).json({
        message: `Succesfully posted`,
        result,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const getAllListingsByUser = asyncHandler(async (req, res) => {
  try {
    Listing.find({ userId: req.userId }, (err, result) => {
      if (err) {
        return res.status(404).json({ message: "No listing found" });
      }
      if (!result) {
        return res.status(404).json({ message: "Not found!" });
      }
      return res.status(200).json({
        message: "Found",
        result,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

// Get all listing
const GetListing = async (req, res) => {
  try {
    await Listing.find().then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Not found!" });
      }
      return res.status(201).json({ result });
    });
  } catch (err) {
    return res.status(500).json({ message: "An error occured", error: err });
  }
};

// Get Individual Listing
const GetIndividualListing = async (req, res) => {
  try {
    await Listing.findById(req.params.id).then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Not found!" });
      }
      return res.status(201).json({ result });
    });
  } catch (err) {
    return res.status(404).json({ message: "Listing Not Found", error: err });
  }
};

// Update
const UpdateListing = async (req, res) => {
  try {
    const {
      listingName,
      address,
      district,
      ward,
      city,
      postcode,
      price,
      facilities,
    } = req.body;

    let image1 = req.files.housephotos[0].path.slice(8);
    let image2 = req.files.housecertif[0].path.slice(8);

    updates = {
      listingName: listingName,
      address: address,
      district: district,
      ward: ward,
      city: city,
      postcode: postcode,
      price: price,
      facilities: facilities,
      housephotos: image1,
      housecertif: image2,
    };
    console.log(req.params.id);
    await Listing.findByIdAndUpdate(req.params.id, updates, {
      findAndModify: false,
    }).then(() => {
      return res.status(201).json({ message: "Successfully Updated" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

// Delete
const DeleteListing = (req, res) => {
  Listing.findByIdAndRemove(req.params.id).then(() => {
    return res.status(201).json({ message: "Successfully Deleted" });
  });
};

module.exports = {
  PostListing,
  GetListing,
  GetIndividualListing,
  UpdateListing,
  DeleteListing,
  getAllListingsByUser,
};
