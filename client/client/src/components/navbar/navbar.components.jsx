import { Link } from 'react-router-dom/cjs/react-router-dom';
import './navbar.style.css';
import image from "../IMAGENES/LOGO-PI-VIDEOG.png"


function Navbar({ handleChange, handleSubmit, gameNotFound }) {
  return (
    <div className='navBar'>
      <div className="logoo-container">
        <Link to={"/"}>
          <img className="logoo" src={image} alt="Logo" />
        </Link>
      </div>

      <div className="search-container">
        <div className='search-bar'>
          <div className="search-input-container">
            <form onChange={handleChange}>
              <input className='search-input' placeholder="Buscar Videojuego" type="search" />
              <button className='search-button' type="submit" onClick={handleSubmit}>Buscar</button>
            </form>
            {gameNotFound && <p className="error-message">No se encontró ningún juego.</p>}
          </div>
        </div>

        <div className="create-button-container">
          <Link to={"/create"}>
            <button className="btoon">CREATE +</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;


