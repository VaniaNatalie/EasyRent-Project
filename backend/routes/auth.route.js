const express = require("express");
const router = express.Router();

const {
  TenantRegister,
  LanlordRegister,
  Login,
  reqPasswordReset,
  passwordReset,
  updateProfile,
  changePassword,
} = require("../controllers/auth.controllers");
const config = require("../config");

const { requireSignIn } = require("../middleware/checkAuth");

router.get("/", async (req, res, next) => {
  res.send("hi");
});

router.get("/login", async (req, res, next) => {
  res.send("login");
});

router.get("/renter", async (req, res, next) => {
  res.json(req.body);
});

router.post("/signup/renter", TenantRegister);
router.post("/signup/owner", LanlordRegister);

router.post("/login", Login);

router.get("/logout", async (req, res, next) => {
  res.send("logout");
});

router.post("/forgetPassword", reqPasswordReset);
router.put("/resetPassword", passwordReset);

router.put("/account", requireSignIn, updateProfile);
router.put("/account/changePassword", requireSignIn, changePassword);

router.get("/verify", (req, res) => {
  res.send("verify");
});

router.get("/privateRoute", requireSignIn);

module.exports = router;
