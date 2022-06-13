const { User, Landlord, Tenant } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const Token = require("../models/token.model");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");
dotenv.config();

// Tenant register controller
const TenantRegister = async (req, res) => {
  const { fullname, username, gender, email, password, role } = req.body;
  try {
    User.findOne({ $or: [{ email: email }, { username: username }] }).then(
      (user) => {
        if (user) {
          let errors = "";
          if (user.username == username) {
            errors = "Username is already in use!";
          } else {
            errors = "Email is already in use!";
          }
          return res.status(400).json({ message: errors });
        } else {
          bcrypt
            .hash(password, 10)
            .then(async (hashedPswd) => {
              await Tenant.create({
                fullname: fullname,
                username: username,
                email: email,
                gender: gender,
                password: hashedPswd,
                role: role,
              });
            })
            .then((tenant) => {
              return res.status(201).json({
                tenant,
                message: `Hi, ${username}! Your account has successfully created~`,
              });
            })
            .catch((err) => {
              return res.status(400).json({
                error: err,
              });
            });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "Sign up failed!", error: err });
  }
};

// Lanlord register controller
const LanlordRegister = async (req, res) => {
  const { fullname, username, mobile_phone, email, password, role } = req.body;
  try {
    User.findOne({ $or: [{ email: email }, { username: username }] }).then(
      (user) => {
        if (user) {
          let errors = "";
          if (user.username == username) {
            errors = "Username is already in use!";
          } else {
            errors = "Email is already in use!";
          }
          return res.status(400).json({ message: errors });
        } else {
          bcrypt
            .hash(password, 10)
            .then(async (hashedPswd) => {
              await Landlord.create({
                fullname: fullname,
                username: username,
                email: email,
                mobile_phone: mobile_phone,
                password: hashedPswd,
                role: role,
                isVerified: false,
              });
            })
            .then((landlord) => {
              return res.status(201).json({
                landlord,
                message: `Hi, ${username}! Your account has successfully created~`,
              });
            })
            .catch((err) => {
              return res.status(400).json({
                error: err,
              });
            });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Sign up failed!", error: err });
  }
};

// Login controller
const Login = async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      // internal server error
      return res.status(500).json({ message: err });
    }
    if (!user) {
      // the requested resource was not found
      return res.status(404).json({
        message: "Authentication failed! Invalid user",
      });
    }
    var passwdIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwdIsValid) {
      // unauthorized
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    var token = generateToken(user._id, user.role);
    console.log(token);
    return res.status(201).json({
      message: "User successfully logged in!",
      user: {
        _id: user._id,
        role: user.role,
        isVerified: user.isVerified,
        email: user.email,
        fullname: user.fullname,
        username: user.username,
        gender: user?.gender,
        mobile_phone: user?.mobile_phone,
        favorites: user?.favorites,
      },
      accessToken: token,
    });
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestRefreshToken } = req.body;
  if (requestRefreshToken) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    var refreshToken = await RefreshToken.findOne({
      token: requestRefreshToken,
    });
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not valid!" });
      return;
    }
    if (RefreshToken.verifyDate(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      });

      res.status(403).json({
        message: "Refresh token expired. Please login!",
      });
      return;
    }
    var newAccessToken = generateToken(refreshToken.user._id);
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occured", error: err });
  }
};

const reqPasswordReset = async (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      // internal server error
      return res.status(500).json({ message: err });
    }
    if (!user) {
      console.log(user);
      return res.status(404).json({
        message: "User does not exist!",
      });
    }
    let token = Token.findOne({ userId: user._id });
    if (token) {
      token.deleteOne();
    }
    let resetToken = crypto.randomBytes(32).toString("hex");

    bcrypt.hash(resetToken, 10).then(async (hashedToken) => {
      await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
      }).save();
    });

    const link = `${process.env.CLIENT_URL}/resetPassword/${user._id}/${resetToken}`;
    sendEmail(
      user.email,
      "Password Reset Request",
      { username: user.username, link: link },
      "./template/reqPasswordReset.handlebars"
    );

    return res.status(200).json({
      message: "Link to reset your password is successfuly sent to your email!",
    });
  });
};

const passwordReset = async (req, res) => {
  try {
    let userPassResetToken = await Token.findOne({ userId: req.body.userId });
    if (!userPassResetToken) {
      return res
        .status(400)
        .json({ message: "Invalid link or expired password reset token" });
    }

    const isTokenValid = await bcrypt.compareSync(
      req.body.token,
      userPassResetToken.token
    );

    if (!isTokenValid) {
      return res
        .status(400)
        .json({ message: "Invalid link or expired password reset token" });
    }

    User.findById({ _id: req.body.userId }).exec((err, user) => {
      if (err) {
        // internal server error
        return res.status(500).json({ message: err });
      }
      bcrypt.hash(req.body.password, 10).then(async (hashedPswd) => {
        user.password = hashedPswd;
        await user.save();
        await userPassResetToken.deleteOne();
      });
      sendEmail(
        user.email,
        "Your password has been successfully reset!",
        { username: user.username },
        "./template/passwordReset.handlebars"
      );
      return res.status(200).json({
        message: "Your password has been successfully reset!",
      });
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
    console.log(error);
  }
};

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      if (user.role === "tenant") {
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.email;
        user.fullname = req.body.fullname || user.fullname;
      }
      if (user.role === "landlord") {
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.email;
        user.fullname = req.body.fullname || user.fullname;
        user.mobile_phone = req.body.mobile_phone || user.mobile_phone;
      }

      const updated = await user.save();
      return res.status(201).json({
        message: "Successfully updated!",
        user: {
          _id: updated._id,
          role: updated.role,
          isVerified: updated.isVerified,
          email: updated.email,
          fullname: updated.fullname,
          username: updated.username,
          gender: updated?.gender,
          mobile_phone: updated?.mobile_phone,
          favorites: updated?.favorites,
        },
        accessToken: generateToken(user._id, user.role),
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Username or email is taken!" });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      if (req.body.password === req.body.confirmPassword) {
        var passwdIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (passwdIsValid) {
          return res.status(400).json({
            message: "New password should not be the same as before",
          });
        } else {
          bcrypt.hash(req.body.password, 10).then(async (hashedPswd) => {
            user.password = hashedPswd;
            await user.save();
            return res.status(201).json({
              message: "Password successfully changed!",
              user: {
                _id: user._id,
                role: user.role,
                isVerified: user.isVerified,
                email: user.email,
                fullname: user.fullname,
                username: user.username,
                gender: user?.gender,
                mobile_phone: user?.mobile_phone,
                favorites: user?.favorites,
              },
              accessToken: generateToken(user._id, user.role),
            });
          });
        }
      } else {
        return res.status(400).json({
          message: "Password don't match",
        });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occured" });
  }
});

module.exports = {
  TenantRegister,
  LanlordRegister,
  Login,
  reqPasswordReset,
  passwordReset,
  updateProfile,
  changePassword,
};
