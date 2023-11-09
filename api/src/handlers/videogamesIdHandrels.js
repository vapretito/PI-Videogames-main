const getVideogameId = require ("../controllers/videogamesIdControllers")

const getDetailHandler = async (req, res) => {
    try {
      const { idVideogame } = req.params;
  
      const response = await getVideogameId(idVideogame);
  
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error.message);
      res.status(400).send(error.message);
    }
  };
  

module.exports= {
    
    getDetailHandler
}
