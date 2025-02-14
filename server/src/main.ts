import "dotenv/config";
import cors from "cors";
import express from "express";
import type { Request, Response } from "express";

import db from "./database/database";
// Check database connection
import "../database/checkConnection";

// Import the Express application from ./app

const app = express();
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Autorisez votre frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Définir le type pour les résultats de la requête
import type { RowDataPacket } from "mysql2/promise";

interface Event extends RowDataPacket {
  id: number;
  name: string;
  place: string;
  number_of_places: number;
  picture: string;
}

// Route pour récupérer tous les événements
app.get("/api/events", async (req: Request, res: Response) => {
  const query = "SELECT * FROM evenements";

  try {
    const [results] = await db.query<Event[]>(query);
    res.json(results);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des événements" });
  }
});

// Exemple de route pour récupérer un événement par ID
app.get(
  "/api/events/:id",
  async (req: Request, res: Response): Promise<void> => {
    const eventId = req.params.id;
    const query = "SELECT * FROM evenements WHERE id = ?";

    try {
      const [results] = await db.query<Event[]>(query, [eventId]);
      if (results.length === 0) {
        res.status(404).json({ error: "Événement non trouvé" });
        return;
      }
      res.json(results[0]);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'événement" });
    }
  },
);

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });

export default app;
