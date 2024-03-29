/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

const Deck = require("../models/Deck");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, REFRESH_TOKEN } = require("../configs");
const JWT = require("jsonwebtoken");

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "Hiep Nguyen",
      sub: userID,
      iat: new Date().getTime(),
    },
    JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

const createRefreshToken = (data) => {
  const access_token = JWT.sign({ data }, REFRESH_TOKEN, {
    expiresIn: "5d",
  });
  return access_token;
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    //console.log(refreshToken);
    if (refreshToken) {
      JWT.verify(refreshToken, REFRESH_TOKEN, function (err, user) {
        if (err) {
          return res.status(404).json({
            message: "The user is not authentication",
          });
        }
        if (user) {
          console.log(user);
          const newAccessToken = encodedToken(user.data);
          return res.json({
            status: "OK",
            access_token: newAccessToken,
            user: user.data,
          });
        } else {
          return res.json({
            message: "The user is not authentication",
          });
        }
      });
    } else {
      return res.json({
        message: "The refreshToken is not valid",
      });
    }
  } catch (err) {
    return res.json({
      status: "err",
      message: err,
    });
  }
};

const authFacebook = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id);
    const refreshToken = createRefreshToken(req.user._id);
    const User = req.user;
    return res.status(200).json({
      success: true,
      token,
      User,
      refreshToken,
      message: "Xác thực authFacebook thành công",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Xác thực không thành công" });
  }
};

const authGoogle = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id);
    const refreshToken = createRefreshToken(req.user._id);
    const User = req.user;
    return res.status(200).json({
      success: true,
      token,
      User,
      refreshToken,
      message: "Xác thực authGoogle thành công",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Xác thực không thành công" });
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userID } = req.value.params;
    const user = await User.findById(userID).select("-password");
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error });
  }
};

const getUserCurrent = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodeToken = JWT.verify(token, process.env.JWT_SECRET);
    if (decodeToken) {
      console.log(decodeToken);
    } else {
      console.log("sss");
    }
    const userCurrent = await User.findById(decodeToken.sub);
    return res.status(200).json(userCurrent);
  } catch (error) {
    console.log(error);
  }
};

const index = async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({ users });
};

const newUser = async (req, res, next) => {
  const newUser = new User(req.value.body);

  await newUser.save();

  return res.status(201).json({ user: newUser });
};

const replaceUser = async (req, res, next) => {
  // enforce new user to old user
  const { userID } = req.value.params;

  const newUser = req.value.body;

  const result = await User.findByIdAndUpdate(userID, newUser);

  return res.status(200).json({ success: true });
};

const signIn = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id);
    const refreshToken = createRefreshToken(req.user._id);
    return res.status(200).json({
      success: true,
      token,
      refreshToken,
      User: req.user._id,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    //
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản hoặc mật khẩu không đúng" });
  }
};

const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.value.body;
    // console.log("req bo fy ne", req.value.body);
    // Check if there is a user with the same user
    const foundUser = await User.find({ email: email });
    if (foundUser.length > 0) {
      // console.log("2");
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    } else {
      const newUser = new User({ firstName, lastName, email, password });
      newUser.save();

      // Encode a token
      const token = encodedToken(newUser._id);
      return res.status(201).json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
  }

  // Create a new user
};

const updateUser = async (req, res, next) => {
  // number of fields
  const { userID } = req.value.params;

  const newUser = req.value.body;

  const result = await User.findByIdAndUpdate(userID, newUser);

  return res.status(200).json({ success: true, result });
};
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ user: users });
  } catch (error) {
    console.log(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    console.log(req.body);
    const userId = req.params.userId;
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const user = await User.findOne({ _id: userId, email: email });
    //bcrypt.compare(newPassword, this.password);
    console.log(user);
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const newPasswordHashed = await bcrypt.hash(newPassword, salt);
        const change = await User.findByIdAndUpdate(userId, {
          password: newPasswordHashed,
        });
        if (change) {
          return res
            .status(200)
            .json({ success: true, message: "Change password successfully" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Password changed successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Not Found User" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  changePassword,
  getAllUser,
  refreshToken,
  getUser,
  index,
  newUser,
  replaceUser,
  signIn,
  signUp,
  updateUser,
  authGoogle,
  authFacebook,
  getUserCurrent,
};
