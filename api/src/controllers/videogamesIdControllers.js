const URL = "https://api.rawg.io/api/games";
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");

const getVideogameId = async (idVideogame) => {
  try {
    
    if (isNaN(idVideogame)) {
      const videogameDB = await Videogame.findByPk(idVideogame, {
        include: Genres,
      });

      if (!videogameDB)
        throw Error(`No existe videojuego con el ID ${idVideogame} en la base de datos`);

      const videogame = {
        id: videogameDB.id,
        name: videogameDB.name,
        description: videogameDB.description,
        image: videogameDB.image,
        rating: videogameDB.rating,
        released:videogameDB.released,
        platforms: videogameDB.platforms.split(', '),
        genres: videogameDB.genres.map((genres) => genres.name).join(", "),
      };
      return videogame;
    }

    const { data } = await axios(`${URL}/${idVideogame}?key=${API_KEY}`);

    if (
      data.name === undefined ||
      data.description === undefined ||
      data.platforms === undefined ||
      data.rating === undefined
    )
      throw Error(`Faltan datos del juego con ID: ${idVideogame}`);

    const videogame = {
      id: data.id,
      name: data.name,
      image: data.background_image,
      description: data.description_raw,
      rating: data.rating,
      released: data.released,
      platforms: data.platforms.map((info) => info.platform.name).join(", "),
      genres: data.genres.map((genres) => genres.name).join(", "),
      
    };
    return videogame;
  } catch (error) {
    console.error("Ha ocurrido un error:", error.message);
    
    throw Error(`No existe el juego con ID: ${idVideogame}`);
  }
};

module.exports = getVideogameId;