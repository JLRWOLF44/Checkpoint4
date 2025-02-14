import "./Header.css";
import { Link } from "react-router-dom";
import headerImage from "../assets/images/00e0293b-4cc5-41de-ac9d-d25cc5606f6b.webp";

function Header() {
  return (
    <>
      <header>
        <img src={headerImage} alt="Header" />
        <h1>LE BAL DES FESTIVALS</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Reservation">Reservation</Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
