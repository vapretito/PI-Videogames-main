const { Videogame, Genres } = require("../db");

const createVideogamesDb = async (
  name,
  description,
  platforms,
  image,
  rating,
  released,
  genres
) => {
  try {
    if (
      !name ||
      !description ||
      !released ||
      !image ||
      !rating ||
      !platforms.length || 
      !genres.length
    ) {
      throw new Error("Faltan datos por completar");
    }

    const findVideogame = await Videogame.findAll({ where: { name: name } });
    if (findVideogame.length) {
      throw new Error("El nombre del Videojuego ya existe");
    }

    const [newVideogame, setNewVideogame] = await Videogame.findOrCreate({
      where: {
        name,
        description,
        platforms: platforms.join(", "),
        image,
        rating,
        released,
      },
    });

    if (setNewVideogame) {
      for (let i = 0; i < genres.length; i++) {
        let newGenre = await Genres.findOne({ where: { name: genres[i] } });

        if (newGenre) {
          await newVideogame.addGenres(newGenre);
        }
      }
    }

    return newVideogame;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = createVideogamesDb;

