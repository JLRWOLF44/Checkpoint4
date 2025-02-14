import { useEffect, useState } from "react";
import "./AdminPage.css";
import { Link } from "react-router-dom";

interface Festival {
  id: string;
  name: string;
  place: string;
  seats: number;
  picture: string;
}

function AdminPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [newFestivalName, setNewFestivalName] = useState("");
  const [newFestivalPlace, setNewFestivalPlace] = useState("");
  const [newFestivalSeats, setNewFestivalSeats] = useState("");
  const [newFestivalImage, setNewFestivalImage] = useState("");
  const [message, setMessage] = useState("");

  // Charger les festivals existants
  useEffect(() => {
    fetch("http://localhost:3310/api/events")
      .then((res) => res.json())
      .then((data) => setFestivals(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  // Ajouter un festival
  const addFestival = () => {
    if (
      !newFestivalName ||
      !newFestivalPlace ||
      !newFestivalSeats ||
      !newFestivalImage
    )
      return;

    const newFestival = {
      name: newFestivalName,
      place: newFestivalPlace,
      seats: Number.parseInt(newFestivalSeats, 10),
      image: newFestivalImage,
    };

    fetch("http://localhost:3310/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFestival),
    })
      .then((res) => res.json())
      .then((data) => {
        setFestivals([...festivals, data]);
        setMessage("Festival ajouté avec succès !");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => console.error("Erreur :", err));
  };

  // Supprimer un festival
  const deleteFestival = (id: string) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce festival ?",
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:3310/api/events/${id}`, { method: "DELETE" })
      .then(() =>
        setFestivals(festivals.filter((festival) => festival.id !== id)),
      )
      .catch((err) => console.error("Erreur :", err));
  };

  return (
    <div className="admin-page">
      {/* Bouton de retour vers Home */}
      <Link to="/" className="back-button">
        ⬅ Retour à l'accueil
      </Link>

      <h1>Gestion des Festivals</h1>

      {/* Message de confirmation */}
      {message && <p className="success-message">{message}</p>}

      {/* Formulaire d'ajout de festival */}
      <div className="add-festival-form">
        <input
          type="text"
          placeholder="Nom du festival"
          value={newFestivalName}
          onChange={(e) => setNewFestivalName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lieu du festival"
          value={newFestivalPlace}
          onChange={(e) => setNewFestivalPlace(e.target.value)}
        />
        <input
          type="number"
          placeholder="Nombre de places"
          value={newFestivalSeats}
          onChange={(e) => setNewFestivalSeats(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={newFestivalImage}
          onChange={(e) => setNewFestivalImage(e.target.value)}
          required
        />
        <button type="button" onClick={addFestival}>
          Ajouter
        </button>
      </div>

      {/* Liste des festivals */}
      <ul>
        {festivals.map((festival) => (
          <li key={festival.id}>
            <h3>{festival.name}</h3>
            <p>Lieu : {festival.place}</p>
            <p>Nombre de places : {festival.seats}</p>
            <img src={festival.picture} alt={festival.name} width="150" />
            <button type="button" onClick={() => deleteFestival(festival.id)}>
              ❌ Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
