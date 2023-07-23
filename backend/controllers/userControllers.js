const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generatetoken = require("../config/generatetoken");
const registerUser = asyncHandler(userHandler);
/**
 * handles users path
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function userHandler(req, res) {
  const { name, email, Pass, pic } = req.body;

  if (!name || !email || !Pass) {
    res.status(400);
    throw new Error("Please enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    Pass,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generatetoken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
}
const authuser = asyncHandler(async (req, res) => {
  const { email, Pass } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchpassword(Pass))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.Pass,
      pic: user.pic,
      token: generatetoken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});
const allusers = asyncHandler(async (req, res) => {
  const keyword = req.query.Search
    ? {
        $or: [
          { name: { $regex: req.query.Search, $options: "i" } },
          { email: { $regex: req.query.Search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, authuser, allusers };
// module.exports = authuser;
