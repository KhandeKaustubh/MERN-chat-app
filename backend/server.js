const express = require("express");
const chats = require("./data/data");
const app = express();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
//port=5000;
const d = require("dotenv");
const connectdb = require("./config/db");
d.config();
connectdb();

const {
  notfound,
  errorhandler,
} = require("../backend/middleware/errorMiddleware");
// app.use(express.urlencoded());
app.use(express.json());
// require('dotenv').config();
const port = process.env.PORT;
app.listen(port, console.log(`server started at port ${port}`));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(express.json());
app.use(notfound);
app.use(errorhandler);
