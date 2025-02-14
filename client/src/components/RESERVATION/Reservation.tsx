import { useParams } from "react-router-dom";

function Reservation() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <h1>Reservation</h1>
      <p>Réservation pour le festival avec l'ID : {id}</p>
    </main>
  );
}

export default Reservation;
