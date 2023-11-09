const axios = require ("axios")
const {Genres} = require ("../db")



const     getAllGenres= async () => {
    const response = await axios.get( "https://api.rawg.io/api/genres?key=8355b308063c4dae9eb56c3e3ca8f26a" );
    const data = response.data.results;
    const nameGenres = data?.map( n => n.name );
  
    const genreCount = await Genres.count();
    if ( genreCount === 0 ) {
      const genreData = nameGenres.map( name => ( { name } ) );
      await Genres.bulkCreate( genreData );
    }
    
    const genresFromDatabase = await Genres.findAll(
      {
        attributes: [ 'name' ],
      }
    );
    const genreNamesFromDatabase = genresFromDatabase.map( genres => ( genres ) );
 
    return genreNamesFromDatabase;
  }
  







module.exports = {
    getAllGenres

}



