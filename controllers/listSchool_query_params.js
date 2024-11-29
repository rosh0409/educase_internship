import { db } from "../db/connection.js";
import { haversineDistance } from "../utils/haversineDistance.js";
export const listSchools_query_params = async (req, res) => {
  const { latitude, longitude } = req.query;

  //! Validate input parameters
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required." });
  }
  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Invalid Latitude or Longitude." });
  }

  try {
    //! Fetch all schools from the database
    const result = await db.query(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "No schools found." });
    }

    //! Calculate distances and sort
    const schoolsWithDistance = result.rows.map((school) => ({
      ...school,
      distance: haversineDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    //! Respond with the sorted list
    res.status(200).json(schoolsWithDistance);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
