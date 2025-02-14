const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const router = require("./src/router");

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "votre_utilisateur",
  password: "votre_mot_de_passe",
  database: "lebaldesfestivals",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL:", err.message);
    return; // On évite d'utiliser process.exit(1)
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Utiliser le routeur
app.use(router);

// Démarrage du serveur
app.listen(port, () => {});
