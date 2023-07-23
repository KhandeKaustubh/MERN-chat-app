const mongoose = require("mongoose");
const d = require("dotenv");
d.config();
const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    // throw error;
    console.log(`error : ${error.message}`);
    // process.exit();
  }
};

module.exports = connectdb;
