import { useEffect, useState  } from 'react';
import { useDispatch, useSelector} from "react-redux";
import {getByName, getVideogames} from "../../redux/actions"


import './home.style.css';
import Cards from '../../components/cards/cards.components';
import Navbar from '../../components/navbar/navbar.components';
import Pagination from '../../components/pagination/pagination';
import FilterOrigin from '../../components/Filters/FilterOrigin';
import OrderByName from "../../components/Filters/FilterbyName";
import OrderByRating from "../../components/Filters/FilterRating";
import FilterGenres from '../../components/Filters/FilterGenres';
import Loading from '../../components/Loading/loading';



function Home() {

const dispatch = useDispatch()
const allVideogames = useSelector((state) => state.allVideogames);
const [searchString, setSearchString] = useState ("");

const totalVideogames = allVideogames.length; 
const [gamesPerPage, setGamesPerPage] = useState(15); 
const [currentPage, setCurrentPage] = useState(1); 
const [loadingPage, setLoadingPage] = useState(true);




const lastIndex = currentPage * gamesPerPage;
  const firstIndex = lastIndex - gamesPerPage; 
  


 function handleChange (e) {
   e.preventDefault ()
   setSearchString(e.target.value)
 }


function handleSubmit (e) {
   e.preventDefault ()
   dispatch(getByName (searchString))

}

function handleClick(e) {
  e.preventDefault ();
  dispatch(getVideogames());
}


useEffect(()=>{
  setLoadingPage(true);
  dispatch(getVideogames()).then(() => {
    setLoadingPage(false); // Finalizar el estado de carga
  });
}, [dispatch]);




return (
  <div >    
    {loadingPage && <Loading />} { }
    <h2 className='title'></h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
    <div className='filter-container'>
      <OrderByRating />
      <OrderByName />
      <FilterOrigin />
      <FilterGenres />
    </div>
    <div className="button-reset-container">
  <button onClick={handleClick} className='button-reset'>Volver a cargar Videojuegos &#10226;</button>
</div>
    <div className='main-content'>
      {!loadingPage && (
        <Cards allVideogames={allVideogames} lastIndex={lastIndex} firstIndex={firstIndex} />
      )}
    </div>
    <div>
      <Pagination
        gamesPerPage={gamesPerPage}
        totalVideogames={totalVideogames}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  </div>
);
}

export default Home;



