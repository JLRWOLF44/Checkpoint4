import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Ajoute useNavigate ici
import type { FestivalI } from "../types/app";
import "./ReservationPage.css";

function Reservation() {
  const { id } = useParams<{ id: string }>(); // Récupérer l'ID de l'événement depuis l'URL
  const navigate = useNavigate(); // Déclare le hook pour la navigation
  const [festival, setFestival] = useState<FestivalI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/events/${id}`) // Récupérer les détails de l'événement
      .then((res) => res.json())
      .then((data) => {
        setFestival(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement des détails de l'événement...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!festival) return <p>Aucun événement trouvé.</p>;

  // Fonction pour revenir à la page d'accueil
  const handleGoHome = () => {
    navigate("/"); // Naviguer vers la page d'accueil
  };

  return (
    <div className="reservation-page">
      <h1>{festival.name}</h1>
      <img
        src={festival.picture}
        alt={festival.name}
        className="festival-image"
      />
      <p className="festival-place">Lieu : {festival.place}</p>
      <button type="button" className="reservation-button">
        Réserver maintenant
      </button>
      <button
        type="button"
        className="home-button"
        onClick={handleGoHome} // Appeler la fonction lors du clic
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

export default Reservation;
