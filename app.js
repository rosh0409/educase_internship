// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import { db } from "./db/connection.js";
import path from "path";
import { fileURLToPath } from "url";
import { addSchool } from "./controllers/addSchool.js";
import { listSchools_query_params } from "./controllers/listSchool_query_params.js";
import { listSchools_route_params } from "./controllers/listSchools_route_params.js";


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "template")));

app.post("/addSchool", addSchool);
app.get("/listSchools", listSchools_query_params);
app.get("/listSchools/:latitude/:longitude", listSchools_route_params);

app.get("", async (req, res) => {
  return res.sendFile("index.html");
});
app.get("/pq", (req, res) => {
  return res.json({ q: req.query, p: req.params });
});

app.listen(8000, (error) => {
  if (error) return console.error(error);
  return console.log(`server started... \nhttp://127.0.0.1:8000`);
});
