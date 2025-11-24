const mongoose = require('mongoose');
const colors = require('colors'); 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB Database: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error in MongoDB connection: ${error}`.bgRed.white);
  }
};

module.exports = connectDB;