const express = require("express");
const Facility = require("../models/Facility");
const router = express.Router();

router.post("/match", async (req, res) => {
    try {
        const { careType, zipCode } = req.body;
        console.log("🔍 Received Match Request:", { careType, zipCode });

        if (!careType || (!zipCode && careType !== "daycare")) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (careType === "daycare") {
            return res.json({ match: false, message: "No facility available for day care." });
        }
        let facilities = await Facility.find({
            $or: [
                { type: new RegExp(`^${careType}$`, "i") }, // Case-insensitive match for careType
                { type: "Stationary & Ambulatory" } 
            ],
            capacity: "Available" // Fetch only available facilities
        });
        
        

        console.log("✅ Fetched Facilities:", facilities);
       


        let matchedFacility = null;

        for (let facility of facilities) {
            facility = JSON.parse(JSON.stringify(facility));  
            console.log(facility.facilityZipCode)
            const distance = Math.abs(facility.facilityZipCode - zipCode);
            console.log(`🔍 Checking Facility: ${facility.name}, Zip: ${facility.facilityZipCode}, Distance: ${distance}, Capacity: ${facility.capacity}`);

            if (facility.capacity !== "Full") {
                if (distance <= 3000) {
                    matchedFacility = facility;
                    break;
                } else {
                    console.log(`🚨 Facility ${facility.name} is available but beyond 3,000 zip codes.`);
                    break; 
                }
            }
        }

        if (matchedFacility) {
            console.log("✅ Matched Facility:", matchedFacility);
            res.json({ match: true, facility: matchedFacility });
        } else {
            console.log("No facility found within range.");
            res.json({ match: false, message: "No available facility within 3,000 zip codes." });
        }
    } catch (error) {
        console.error("Error in /match route:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;


