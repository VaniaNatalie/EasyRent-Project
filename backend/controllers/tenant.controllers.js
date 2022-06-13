const { Tenant } = require("../models/user.model");
const { Listing } = require("../models/listings.model");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

const PostFavorites = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.userId);
    const tenant = await Tenant.findById(req.userId);
    if (tenant) {
      tenant.favorites.push(req.params.id);
      const t = await tenant.save();

      return res.status(201).json({
        message: "Successfully added",
        accessToken: generateToken(t._id, t.role),
      });
    } else {
      return res.status(404).json({ message: "Listing Not Found!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong with the server!" });
  }
});

const getAllFavorites = asyncHandler(async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.userId);
    if (tenant) {
      if (tenant.favorites.length === 0) {
        return res.status(404).json({ message: "No favorites added yet!" });
      }

      Listing.find(
        {
          _id: { $in: tenant.favorites },
        },
        function (err, fav) {
          if (err) {
            console.log(err);
          }

          return res.status(201).json({ fav });
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

const DeleteFavorites = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.userId);
    if (tenant) {
      tenant.favorites.remove(req.params.id);
      const t = await tenant.save();

      return res.status(201).json({
        message: "Successfully deleted",
        accessToken: generateToken(t._id, t.role),
      });
    } else {
      return res.status(404).json({ message: "Listing Not Found!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong with the server!" });
  }
};

const RecentlyViewed = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.userId);
    if (tenant) {
      if (tenant.recentlyviewed.length <= 6) {
        tenant.recentlyviewed.push(req.params.id);
      } else {
        tenant.recentlyviewed.shift();
        tenant.recentlyviewed.push(req.params.id);
      }
      const t = await tenant.save();
      return res.status(201).json({
        accessToken: generateToken(t._id, t.role),
      });
    } else {
      return res.status(404).json({ message: "Listing Not Found!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong with the server!" });
  }
};

module.exports = {
  PostFavorites,
  DeleteFavorites,
  RecentlyViewed,
  getAllFavorites,
};
