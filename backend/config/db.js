const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
            socketTimeoutMS: 60000,          // Increase socket timeout to 60 seconds
            connectTimeoutMS: 60000,         // Increase initial connection timeout
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Atlas Connected!");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = { connectDB };
