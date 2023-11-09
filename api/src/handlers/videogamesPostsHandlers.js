const createVideogamesDb = require("../controllers/videogamesPostControllers")



const postVideogame = async (req, res) => {
    const {name, description, released, image, rating, platforms, genres} = req.body;

    
    try {
        const postVideogame = await createVideogamesDb (name, description, platforms, image, rating, released, genres);
        res.status(200).json({newVideoGame: postVideogame});
        
    } catch (error) {
        res.status(400).json ({error: error.message})
        console.log(error)

    }

}



module.exports = postVideogame;
