import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import type { FestivalI } from "../types/app.d.ts";
import "./Home.css";
function HomePage() {
  const [festivals, setFestivals] = useState<FestivalI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/events")
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des festivals");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFestivals(data);
        } else {
          throw new Error("Données API invalides");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des festivals...</p>;
  if (error) return <p>❌ {error}</p>;
  if (festivals.length === 0) return <p>Aucun festival trouvé.</p>;

  return (
    <main className="home-container">
      {/* Bouton Administrateur en haut */}
      <div className="admin-section">
        <Link to="/admin">
          <button type="button" className="admin-button">
            Accès Administrateur
          </button>
        </Link>
      </div>

      <div className="festival-container">
        {festivals.map((festival) => (
          <div key={festival.id} className="festival-card">
            {/* Lien vers la page de détails du festival */}
            <Link to={`/festival/${encodeURIComponent(festival.id)}`}>
              <Card
                id={festival.id}
                name={festival.name}
                image={festival.picture || "default.jpg"}
              />
            </Link>

            {/* Lien vers la page de réservation */}
            <Link
              to={`/reservation/${festival.id}`}
              className="reservation-link"
            >
              Réserver
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
