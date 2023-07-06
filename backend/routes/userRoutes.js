// import registerUser from "../controllers/userControllers"
const {
  registerUser,
  authuser,
  allusers,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.route("/").post(registerUser).get(protect, allusers);
router.route("/login").post(authuser);

module.exports = router;
