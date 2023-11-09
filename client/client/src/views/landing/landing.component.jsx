import { Link } from "react-router-dom";
import "./landing.style.css";
import image from "../../components/IMAGENES/LOGO-PI-VIDEOG.png"

const LandingPage = () => {
  return (
    <div className="landing">
      <img className= "logo" src={image} alt="Logo" />
      <div className="contenedor">
        
        <Link to={"/home"}>
          <button className="btn">Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
