import './cards.style.css';
import Card from '../card/card.components';


const Cards = ({ allVideogames, lastIndex, firstIndex }) => {
  return (
    <div className="divCards">
      {allVideogames
        ?.map((videogame) => <Card key={videogame.id} videogame={videogame} />)
        .slice(firstIndex, lastIndex)}
    </div>
  );
};

export default Cards;




// function Cards({ allVideogames }) {
//   // Mostrar solo los primeros 15 videojuegos
//   const gamesList = allVideogames.slice(0, 15);

//   return (
//     <div className='divCards'>
//       {gamesList.map((videogame) => (
//         <Card key={videogame.id} videogame={videogame} />
//       ))}
//     </div>
//   );
// }

// export default Cards;


