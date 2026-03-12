const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);  // Changed from MONGODB_URI to MONGO_URI

    mongoose.connection.on('connected', () => {
      console.log("✅ Connected to MongoDB successfully");
    });

    mongoose.connection.on('error', (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    return mongoose.connection;
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    throw err;
  }
};

module.exports = connectDB;