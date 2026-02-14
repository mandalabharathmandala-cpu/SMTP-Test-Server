const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mandalabharathmandala_db_user:lzWL0iWpMMhKBkbd@cluster0.xywruev.mongodb.net/");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
