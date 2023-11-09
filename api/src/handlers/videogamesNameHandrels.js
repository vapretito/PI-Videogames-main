const getVideogamegByName = require("../controllers/videogamesNameControllers");


const getVideogameByNameHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await getVideogamegByName(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getVideogameByNameHandler;