import dotenv from "dotenv";
import type { Request, Response } from "express";
import mysql from "mysql2";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "votre_utilisateur",
  password: process.env.DB_PASSWORD || "votre_mot_de_passe",
  database: process.env.DB_NAME || "lebaldesfestivals",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL:", err.message);
    return;
  }
});

const eventActions = {
  browse: (req: Request, res: Response) => {
    console.error("Requête API: récupération des événements...");
    const query = "SELECT * FROM evenements";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des événements:", err);
        return res.status(500).json({ error: err.message });
      }
      console.error("Résultats obtenus:", results);
      res.json(results);
    });
  },
};

export default eventActions;
