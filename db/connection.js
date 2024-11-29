import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";

const { Pool } = pkg;
export const db = new Pool({ connectionString: process.env.DATABASE_URL });
// import { neon } from "@neondatabase/serverless";
// console.log(process.env.DATABASE_URL);
// export const db = neon(process.env.DATABASE_URL);
