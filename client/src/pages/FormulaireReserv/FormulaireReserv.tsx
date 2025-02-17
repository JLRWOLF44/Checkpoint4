import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FormulaireReserv.css";

function FormulaireReserv() {
  // Récupère l'ID de l'événement depuis l'URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // États pour gérer les champs du formulaire et les messages
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [places, setPlaces] = useState(1);
  const [message, setMessage] = useState("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Données de réservation à envoyer au serveur
    const reservationData = {
      nom,
      email,
      places,
      eventId: id, // ID de l'événement
    };

    // Envoi de la requête POST au serveur
    fetch("http://localhost:3310/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((res) => {
        // Vérifie si la réponse est OK (statut 200-299)
        if (!res.ok) {
          throw new Error("Erreur lors de la réservation");
        }
        return res.json();
      })
      .then(() => {
        // Affiche un message de succès et redirige après 3 secondes
        setMessage("Réservation effectuée avec succès !");
        setTimeout(() => {
          navigate("/"); // Redirection vers la page d'accueil
        }, 3000);
      })
      .catch((err) => {
        // Affiche un message d'erreur en cas de problème
        setMessage(
          err.message || "Une erreur s'est produite lors de la réservation.",
        );
      });
  };

  return (
    <div className="reserv-form">
      <h1>Réserver des places</h1>
      {/* Affiche un message de succès ou d'erreur */}
      {message && (
        <p
          className={
            message.includes("succès") ? "success-message" : "error-message"
          }
        >
          {message}
        </p>
      )}
      {/* Formulaire de réservation */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Nombre de places"
          value={places}
          onChange={(e) => setPlaces(Number(e.target.value))}
          min="1" // Nombre minimum de places
          required
        />
        <button type="submit">Confirmer la réservation</button>
      </form>
      {/* Bouton pour retourner à l'accueil */}
      <button type="button" onClick={() => navigate("/")}>
        Retour à l'accueil
      </button>
    </div>
  );
}

export default FormulaireReserv;
