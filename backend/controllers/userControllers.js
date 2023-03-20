const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

const registerUser = asyncHandler(userHandler);

/**
 * handles users path
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function userHandler(req, res) {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
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
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
}
module.exports = registerUser;
