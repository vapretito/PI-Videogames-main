const URL = "https://api.rawg.io/api/games";
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame,Genres  } = require("../db.js");

const getAllVideogames = async () => {
  try {
    const totalPages = 5; 
    const limit = 20; 
    const allVideogames = [];
    const gameDB = [];

    const videogamesDB = await Videogame.findAll({
      include: Genres,
    });

    const mappedVideogamesDB = videogamesDB.map((videogameDB) => ({
      id: videogameDB.id,
      name: videogameDB.name,
      image: videogameDB.image,
      description: videogameDB.description,
      platforms: videogameDB.platforms.split(', '),
      released: videogameDB.released,
      rating: videogameDB.rating,
      genres: videogameDB.genres.map((genres) => genres.name),
      source: "Database",
    }));

    gameDB.push(...mappedVideogamesDB);

    for (let page = 1; page <= totalPages; page++) {
      const videogamesApi = await axios(`${URL}?key=${API_KEY}&page=${page}&page_size=${limit}`);
    
      if (!videogamesApi.data.results || videogamesApi.data.results.length === 0) {
        throw Error(`No hay juegos en la página ${page} de la API`);
      }

      const videogamesFromPage = videogamesApi.data.results.map((videogame) => ({
        id: videogame.id,
        name: videogame.name,
        image: videogame.background_image,
        genres: videogame.genres.map((genres) => genres.name).join(", "),
        released: videogame.released,
        rating: videogame.rating,
        platforms: videogame.platforms
          .map((info) => info.platform.name)
          .join(", "),
      }));
    
      allVideogames.push(...videogamesFromPage);
    }
    
    return [...gameDB, ...allVideogames];
  } catch (error) {
    console.error("Error in getAllVideogames:", error);
    throw error;
  }
};

module.exports = getAllVideogames;
