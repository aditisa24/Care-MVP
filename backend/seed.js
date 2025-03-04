require("dotenv").config();
const { client } = require("./config/db");

const facilities = [
    { name: "A", type: "Stationary", servesZipCodes: "10000–14999", facilityZipCode: 12000, capacity: "Full" },
    { name: "B", type: "Stationary", servesZipCodes: "15000–19999", facilityZipCode: 17000, capacity: "Available" },
    { name: "C", type: "Ambulatory", servesZipCodes: "20000–24999", facilityZipCode: 22000, capacity: "Full" },
    { name: "D", type: "Ambulatory", servesZipCodes: "25000–29999", facilityZipCode: 27000, capacity: "Available" },
    { name: "E", type: "Stationary & Ambulatory", servesZipCodes: "10000–24999", facilityZipCode: 18000, capacity: "Available" }
];

const seedDatabase = async () => {
    try {
        await client.connect();
        const db = client.db("careportal");
        const collection = db.collection("facilities");

        await collection.deleteMany({}); // Clear old data
        await collection.insertMany(facilities); // Insert new data

        console.log("✅ Database Seeded Successfully!");
    } catch (error) {
        console.error("eeding Failed:", error);
    } finally {
        await client.close(); // Close MongoDB connection
    }
};

seedDatabase();
