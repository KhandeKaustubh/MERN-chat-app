const express = require("express");
const chats = require("./data/data");
const app = express();
const userRoutes = require("./routes/userRoutes");
//port=5000;
const d = require("dotenv");
const connectdb = require("./config/db");
d.config();
connectdb();
// require('dotenv').config();
const port = process.env.PORT;
app.listen(port, console.log(`server started at port ${port}`));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(express.json());
app.use("/api/user", userRoutes);
