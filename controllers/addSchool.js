import { db } from "../db/connection.js";
// Add School API
export const addSchool = async (req, res) => {
  //   console.log("hiii");
  //   //   return res.send("hii");
  //   return res.send(req?.body);
  //   console.log(req);
  //   return res.send(req);
  const { name, address, latitude, longitude } = req.body;

  // Validate input data
  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude must be numbers." });
  }

  try {
    // res.json({ message: "success", name, address, longitude, latitude });
    // Insert into database
    const result = await db.query(
      `INSERT INTO schools (name, address, latitude, longitude)
     VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, address, latitude, longitude]
    );
    res
      .status(201)
      .json({ message: "School added successfully", id: result.rows[0].id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
