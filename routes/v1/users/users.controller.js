const userService = require("./users.service");
const { validationResult } = require("express-validator");
const logger = require("../../../logger");
const customResponse = require("../../../util/responseFormat");
const { compare } = require("bcrypt");

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return customResponse.validationError(res, { errors: errors });
  }

  try {
    //If both password field and facebookId is present, consider facebookId first
    let user;
    if (req.body.facebookId) {
      user = await userService.saveUserWithFacebookId(req.body);
    } else {
      user = await userService.saveUserWithPassword(req.body);
    }

    const { email } = user;
    const payload = {
      email,
    };
    const accessToken = userService.generateAccessToken(payload);
    const refreshToken = userService.generateRefreshToken(payload);
    userService.clearCookie(res);
    userService.generateCookie(res, refreshToken);
    await userService.saveRefreshTokenInDB(user, refreshToken);
    return customResponse.success(res, { access_token: accessToken });
  } catch (error) {
    if (error.code === 11000) {
      return customResponse.customError(res, "User already exists", null);
    }
    console.log("ISE ", error);
    return customResponse.internalServerError(res);
  }
};

exports.signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return customResponse.validationError(res, { errors: errors });
  }

  try {
    const { email, password } = req.body;
    const cookies = req.cookies;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return customResponse.notFound(res, "User not registered", null);
    }
    const match = await compare(password, user.password);
    if (!match) {
      return customResponse.unAuthorized(
        res,
        "Incorrect email or password",
        null
      );
    }
    const payload = {
      email: email,
    };
    //step1: generate access token and refresh token
    const accessToken = userService.generateAccessToken(payload);
    const refreshToken = userService.generateRefreshToken(payload);
    //step2:
    //      - If there is a token present in req.cookie then find it in db and remove it
    //      - Save the generated refresh token in cookie
    //      - Save the generated refresh token in db

    if (!cookies.jwt) {
      //First time login
      userService.generateCookie(res, refreshToken);
    } else {
      await userService.removeRefreshTokenFromDB(user, cookies.jwt);
      userService.clearCookie(res);
      userService.generateCookie(res, refreshToken);
    }
    await userService.saveRefreshTokenInDB(user, refreshToken);
    return customResponse.success(res, null, { access_token: accessToken });
  } catch (error) {
    return customResponse.internalServerError(res);
  }
};

exports.getAccessToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) {
      return customResponse.forbidden(res, null, null);
    } else {
      const user = await userService.verifyRefreshToken(cookies.jwt);
      if (!user) {
        return customResponse.unAuthorized(res, null, null);
      }
      const { email } = user;
      const payload = {
        email: email,
      };
      const accessToken = userService.generateAccessToken(payload);
      const refreshToken = userService.generateRefreshToken(payload);
      await userService.removeRefreshTokenFromDB(user, cookies.jwt);
      userService.clearCookie(res);
      userService.generateCookie(res, refreshToken);
      await userService.saveRefreshTokenInDB(user, refreshToken);
      return customResponse.success(res, null, { access_token: accessToken });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return customResponse.unAuthorized(res);
    }
    return customResponse.internalServerError(res);
  }
};
