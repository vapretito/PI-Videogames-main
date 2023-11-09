
const {getAllGenres} = require ("../controllers/genresControllers")

const getGenresHandler= async (req, res) => {
     
    try {
       
           const genresName = await getAllGenres ()
           res.status(200).json(genresName);
       
       
    } catch (error) {
       res.status(400).json ({error: error.message})
       
    }
}




module.exports ={
    
    getGenresHandler

}
