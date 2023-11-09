import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {postVideogame, fetchGenres, getPlatforms} from "../../redux/actions/index"
import flecha from "../../components/IMAGENES/flecha.png"
import './create.style.css';



function validate (input) {

let errors = {};
  if (!input.name) {
    errors.name = "El nombre es requerido";
  } else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
    errors.name =
      "Solo se aceptan letras, numeros, guiones medios y parentesis";
  } else if (input.name.length > 50) {
    errors.name = "El nombre es demasiado largo";
  }
  // if (!input.image) {
  //   errors.image = "La imagen es requerida";
  // } else if (!/\.(jpg|jpeg|png|gif)$/i.test(input.image)) {
  //   errors.image = "El formato de imagen no es válido. Se aceptan formatos jpg, jpeg, png y gif";
  // }  

  if (!input.description) {
    errors.description = "La descripcion es requerida";
  } else if (input.description.length > 800) {
    errors.description = "La descripcion es muy larga. (Max = 800 caracteres)";
  }
  if (!input.platforms) {
    errors.platforms = "La plataforma es requerida";
  
  }


  if (!input.released) {
    errors.released = "Se requiere fecha de creación";
  } else if (input.released.length < 10) {
    errors.released = "Ingresar datos de released: yyyy-mm-dd";
  }
  if (input.released.length > 10 || !/^[0-9-]+$/.test(input.released)) {
    errors.released = "Se requiere una fecha valida(dd/mm/aaaa)";
  }

  if (!input.rating) {
    errors.rating = "El rating es requerido";
  } else if (input.rating > 5) {
    errors.rating = "El rating no debe ser mayor a 5";
  } else if (input.rating < 0) {
    errors.rating = "El rating no puede ser menor que 1.0";
  }

  return errors;
};




const Create = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const genres= useSelector((state) => state.genres)
  const nameList = useSelector((state) => state.allVideogames);
  const platforms= useSelector((state) => state.platforms)
  console.log(platforms)






  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchGenres())
    dispatch(getPlatforms())
    
  }, [dispatch]);


  

  const handleChange = (event) => {
    const { name, value } = event.target;

if (name === 'rating') {
  const parsedValue = parseInt(value);
  if (parsedValue < 0 || parsedValue > 5) {
    return;
  }
}
    
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handlePlataform = (event)=> {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, event.target.value])],
    });
  };


  const handleGenre = (event) => {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, event.target.value])],
    });
  };

  const handleDeleteGenre = (event) => {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== event),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let noRepeat = nameList.filter((n) => n.name === input.name);
    if (noRepeat.length) {
      alert("Ya existe un juego con ese nombre");
      errors.name = "Ya existe un juego con ese nombre";
    } else {
      let error = Object.keys(validate(input));
      if (error.length || !input.genres.length || !input.platforms.length) {
        alert("Falta completar datos");
        errors.genres = "falta completar datos";
        error.platforms = "falta completar datos";
      } else {
        dispatch(postVideogame(input));
        alert("Videojuego creado!!🕹️👾");
        setInput({
          name: "",
          image: "",
          description: "",
          released: "",
          rating: "",
          platforms: [],
          genres: [],
        });
        history.push("/home");
      }
    }
  };



  return (
    <div>
    <Link to={"/home"}>
    <img className= "arrow-image" src={flecha} alt="Flecha" />
    </Link>
    
    <div className='form-container'>
    
  <div class="tetris-block block1"></div>
  <div class="tetris-block block2"></div>
  <div class="tetris-block block3"></div>
  <div class="tetris-block block4"></div>
  <div class="tetris-block block5"></div>
  <div class="tetris-block block6"></div>
  <div class="tetris-block block7"></div>
      <form onSubmit={(event) => handleSubmit(event)} className='create-form'>
        <div className="form-group">
          <label>Nombre</label>
          <input
            name="name"
            placeholder='Nombre videojuego'
            type="text"
            value={input.name}
            onChange={(event) => handleChange(event)}
          />
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input
            name="image"
            type="text"
            placeholder='ImagenUrl..'
            value={input.image}
            onChange={(event) => handleChange(event)}
          />
          {errors.image && <p className="errors">{errors.image}</p>}
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            placeholder='Description'
            type="text"
            value={input.description}
            onChange={(event) => handleChange(event)}
          />
          {errors.description && <p className="errors">{errors.description}</p>}
        </div>
        <div className="form-group">
        <label>Plataformas: </label>
        <select
                  onChange={(event) => handlePlataform(event)}
                >
                  <option value="all">plataformas...</option>
                  {platforms?.map((p) => {
                    return (
                      <option  key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='form-options'  >
                {input.platforms.map((p) => (
                  <span key={p} className='option-label'>
                    
                    <button className='button-options'
                      onClick={() => handleDeleteGenre(p)}
                      key={p.id}
                      id={p.id}
                      value={p.name}
                    >
                      <span>X</span>
                    </button>
                    <p>{p}</p>
                  </span>
                ))}
              </div>
        
        <div className="form-group">
        <label>Fecha de lanzamiento</label>
         <input
            name="released"
            type="date"
            value={input.released}
            onChange={(event) => handleChange(event)}
          />
          {errors.released && <p className="errors">{errors.released}</p>}
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            name="rating"
            type="number"
            placeholder='0'
            value={input.rating}
            onChange={(event) => handleChange(event)}
          />
          {errors.rating && <p className="errors">{errors.rating}</p>}
        </div>
        
        <div className="form-group">
          <label>Generos</label>
          <select
                  onChange={(event) => handleGenre(event)}
                >
                  <option value="all">Generos...</option>
                  {genres?.map((g) => {
                    return (
                      <option  key={g.id} value={g.name}>
                        {g.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='form-options'  >
                {input.genres.map((g) => (
                  <span key={g} className='option-label'>
                    
                    <button className='button-options'
                      onClick={() => handleDeleteGenre(g)}
                      key={g.id}
                      id={g.id}
                      value={g.name}
                    >
                      <span>X</span>
                    </button>
                    <p>{g}</p>
                  </span>
                ))}
              </div>

              {Object.keys(errors).length ? (
                <div>
                  <input  className= "create-button"
                    type="submit"
                    disabled
                    name="Send"
                  />
                </div>
              ) : (
                <div>
                  <input   className= "create-button" type="submit" name="Send" />
                </div>
              )}
            </form>
       
      
    </div>
    </div>
  );
};

export default Create;
