require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, client } = require("./config/db");
const facilityRoutes = require("./routes/facilityRoute");
const matchRoutes = require("./routes/matchRoute");



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", matchRoutes);

connectDB();

app.use("/api", facilityRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Close MongoDB connection when the app stops
process.on("SIGINT", async () => {
    console.log("\nClosing MongoDB Connection...");
    await client.close();
    process.exit(0);
});
