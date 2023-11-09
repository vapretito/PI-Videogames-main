const { Videogame, Genres } = require("../db");
const URL = "https://api.rawg.io/api/games?search=";
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const getVideogamegByName = async (name) => {
  try {
    const videogamesDb = await getVideogameDbByName(name);
    const videogamesApi = await getVideogameapiByName(name);

    const videogamesFound = [...videogamesDb, ...videogamesApi];

    if (!videogamesFound.length)
      throw Error(`No se encontró ningun videojuego con el nombre ${name}`);

    return videogamesFound;
  } catch (error) {
    console.log(error)
    throw Error(`No se encontró ningun videojuego con el nombre ${name}`);
  }
};

const getVideogameDbByName = async (name) => {
  const auxVideogameDb = await Videogame.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: Genres, 
  });

  const videogamesDb = auxVideogameDb.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      rating: videogame.rating,
      
      genres: videogame.Genres.map((genre) => genre.name).join(', '),
      
    };
  });
 
  return videogamesDb;
};

const getVideogameapiByName = async (name) => {
  const { data } = await axios(`${URL}${name}&key=${API_KEY}&page_size=15`);
  const videogamesApi = data.results.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      image: videogame.background_image,
      rating: videogame.rating,
      genres: videogame.genres.map((genre) => genre.name).join(', '),
    };
  });
  return videogamesApi;
};

module.exports = getVideogamegByName;