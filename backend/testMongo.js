const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const checkFacilityZipCode = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db("careportal");

        const facilities = await db.collection("facilities").find().toArray();
        
        console.log("✅ Checking Facilities in MongoDB:");
        facilities.forEach(facility => {
            console.log(`Name: ${facility.name}, Zip: ${facility.facilityZipCode}, Type: ${typeof facility.facilityZipCode}`);
        });

        await client.close();
    } catch (error) {
        console.error("Error checking facilities:", error);
    }
};

checkFacilityZipCode();
