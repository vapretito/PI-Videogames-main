import './details.style.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getById } from '../../redux/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import flecha from "../../components/IMAGENES/flecha.png"
import Loading from '../../components/Loading/loading';

function Detail({ selectedVideogame, getById, match }) {
  const { id } = match.params;

  useEffect(() => {
    getById(id);
  }, [getById, id]);

  if (!selectedVideogame) {
    return <Loading/>;
  }

  const { name, description, rating, platforms,image, released, genres } = selectedVideogame;
  
  return (
    <div>
      <Link to={"/home"}>
      <img className= "arrow-image" src={flecha} alt="Flecha" />
      </Link>
    
    <div className="wrapper">
      
      <div className='name'> <h1>{name}</h1>
      </div>
      <img  className= "image" src={image} alt={name} />
      <div>
        <h2>ID: {id}</h2>
      </div>
      <div className='details'>
      <h3>Descripcion: {description}</h3>
      </div>
      <div>
      <p>Rating: {rating}
      </p>
      </div>
      <div>
      <p>Plataformas: {platforms}</p>
      </div>
      <p>Fecha de lanzamiento: {released}</p>
      <div>
      </div>
      <p>Genero: {genres}</p>
      <div>

      </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    selectedVideogame: state.selectedVideogame,
  };
};

const mapDispatchToProps = {
  getById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

 

  


