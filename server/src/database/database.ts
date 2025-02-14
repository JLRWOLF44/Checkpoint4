import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "votre_utilisateur",
  password: process.env.DB_PASSWORD || "votre_mot_de_passe",
  database: process.env.DB_NAME || "lebaldesfestivals",
});

export default db;
