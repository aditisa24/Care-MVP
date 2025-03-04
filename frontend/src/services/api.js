import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Replace with Render URL after deployment

export const findFacilityMatch = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/match`, formData);
        return response.data;
    } catch (error) {
        console.error("Error fetching match:", error);
        return { match: false, message: "Server error" };
    }
};
