import registerUser from "./controllers/userControllers";
const express = require("express");
const router = express.Router();

router.route("/").post(registerUser);
