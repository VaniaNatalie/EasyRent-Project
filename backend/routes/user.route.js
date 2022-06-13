const express = require("express");
const router = express.Router();
const {
  adminBoard,
  GetUsers,
  deleteUser,
} = require("../controllers/user.controllers");
const { adminAuth } = require("../middleware/checkAuth");

router.get("/", adminAuth, adminBoard);
router.get("/allusers", adminAuth, GetUsers);
router.delete("/deleteUser/:id", adminAuth, deleteUser);

module.exports = router;
