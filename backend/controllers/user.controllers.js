const { User } = require("../models/user.model");
const { Listing } = require("../models/listings.model");

const adminBoard = (req, res) => {
  res.status.json({ message: "Admin Content" });
};

// Get all users
const GetUsers = async (req, res) => {
  try {
    await User.find().then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Not found!" });
      }
      return res.status(201).json({ result });
    });
  } catch (err) {
    return res.status(500).json({ message: "An error occured", error: err });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.params.id).then(() => {
    return res.status(201).json({ message: "Successfully Deleted" });
  });
  Listing.deleteMany({ user: req.params.id }).then(() => {
    return res.status(201).json({ message: "Successfully Deleted" });
  });
};

module.exports = {
  adminBoard,
  GetUsers,
  deleteUser,
};
