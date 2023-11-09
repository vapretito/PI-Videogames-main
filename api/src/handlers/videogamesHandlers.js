const getAllVideogames = require ("../controllers/videogamesControllers")




const getVideogameHandler = async (req, res) => {
    try {
      const response = await getAllVideogames();
  
      res.status(200).json(response);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };


 
  




module.exports= {
    getVideogameHandler,
    
}