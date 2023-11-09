import { Link } from 'react-router-dom';
import './card.style.css';


function Card({ videogame }) {
  const { name, genres, image, rating, id } = videogame;
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`}>&#9733;</span>); // Full star
    }
    if (halfStar) {
      stars.push(<span key={`star-half`}>&#9733;</span>); // Half star
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`star-empty-${i}`}>&#9734;</span>); // Empty star
    }
    return stars;
  };

  return (
    <div className="divCard">
      <div>
        <img className="imagen" src={image} alt={name} />
        <Link to={`/home/${id}`}>
          <div className='names'><h2>{name}</h2></div>
        </Link>
        </div>
        <div className="data">
          <h2>{genres} </h2>
          </div>

          <div className="data">
           <h2>{rating} </h2>
            <div className="stars">{generateStars(rating)}
            </div></div>
        
      
    </div>
  );
}

export default Card;