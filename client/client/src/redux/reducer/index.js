import { GET_VIDEOGAMES, GET_BY_NAME, GET_BY_ID, GENRES_FILTER, ORIGIN_FILTER, ORDER_BY_RATING, FETCH_GENRES,
    ORDER_BY_NAME,GET_PLATFORMS} from "../actions"

let initialState ={ allVideogames:[], videogamesCopy: [], videogame: {}, filteredVideogames: [], genres: [], filteredGenres: [], platforms: [] }

function rootReducer (state = initialState, action){
    switch (action.type){
        case GET_VIDEOGAMES:
            return{
                ...state,
                allVideogames:action.payload,
                videogamesCopy: action.payload

            };
    
        case GET_BY_NAME:
            return{
                ...state,
                allVideogames: action.payload

            } 
        case GET_BY_ID: 
      return {
        ...state,
        selectedVideogame: action.payload,
      };   
      

        case "POST_VIDEOGAME":
          return{
            ...state,
          }

          case GET_PLATFORMS:
      
      return {
        ...state,
        platforms: action.payload,
      };

      

        case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
      case GENRES_FILTER:
        let filterByGenre;
        action.payload === "AllGenres"
          ? (filterByGenre = state.videogamesCopy)
          : (filterByGenre = state.videogamesCopy.filter(
              (videogame) =>
                videogame.genres && videogame.genres.includes(action.payload)
            ));
        return {
          ...state,
          allVideogames: [...filterByGenre],
        };
      case ORIGIN_FILTER:
        let filterByOrigin;
        action.payload === "AllOrigins"
          ? (filterByOrigin = state.videogamesCopy)
          : action.payload === "API"
          ? (filterByOrigin = state.videogamesCopy.filter(
              (videogame) => typeof videogame.id === "number"
            ))
          : (filterByOrigin = state.videogamesCopy.filter(
              (videogame) => typeof videogame.id !== "number"
            ));
  
        return {
          ...state,
          allVideogames: [...filterByOrigin],
        };
  
        case ORDER_BY_NAME:
          let orderNames = state.videogamesCopy.slice(); 
          const sortOrder = action.payload === "Descendente" ? -1 : 1;
      
          orderNames.sort((a, b) => {
              const nameA = a.name?.toLowerCase(); 
              const nameB = b.name?.toLowerCase(); 
              return sortOrder * nameA.localeCompare(nameB);
          });
      
          return {
              ...state,
              allVideogames: [...orderNames],
          };
      
  
      case ORDER_BY_RATING:
        let orderRatings = state.videogamesCopy;
        action.payload === "Descendente"
          ? orderRatings.sort((a, b) => b.rating - a.rating)
          : orderRatings.sort((a, b) => a.rating - b.rating);
        return {
          ...state,
          allVideogames: [...orderRatings],
        };
        default:
            return state       
             
          
    }
    
}

export default rootReducer