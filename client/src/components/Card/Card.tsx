import { Link } from "react-router-dom";
import "./Card.css";

interface CardProps {
  id: number | undefined;
  name: string;
  image: string;
}

function Card({ id, name, image }: CardProps) {
  return (
    <Link to={`/reservation/${id}`} className="card-link">
      <figure className="card">
        <img src={image} alt={name} />
        <figcaption>
          <h2>{name}</h2>
        </figcaption>
      </figure>
    </Link>
  );
}

export default Card;
