const User = require("./users.model");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
var refreshTokenArr = [];
const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = require("../../../util/config");

exports.generateAccessToken = (payload) =>
  jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
  });

exports.generateRefreshToken = (payload) =>
  jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

exports.verifyRefreshToken = async (token) => {
  const decodedToken = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
  const { email } = decodedToken;
  const user = await User.findOne({ email, refreshToken: token });
  if (!user) {
    return null;
  }
  return user;
};

exports.saveUserWithPassword = async (data) => {
  const { email, password, name } = data;
  const user = new User({
    email,
    password,
    name,
  });
  return await user.save();
};

exports.saveUserWithFacebookId = async (data) => {
  const { email, name, facebookId } = data;
  const user = new User({
    email,
    facebookId,
    name,
  });
  return await user.save();
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.saveRefreshTokenInDB = async (user, refreshToken) => {
  return await User.findOneAndUpdate(
    { email: user.email },
    { $push: { refreshToken } }
  );
};

exports.removeRefreshTokenFromDB = async (user, refreshToken) => {
  return await User.findOneAndUpdate(
    { email: user.email },
    { $pull: { refreshToken } }
  );
};

exports.clearCookie = (res) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
};

exports.generateCookie = (res, refreshToken) => {
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
};
