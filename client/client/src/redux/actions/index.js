import axios from "axios"



export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_BY_ID = "GET_BY_ID"
export const GENRES_FILTER = "GENRES_FILTER"
export const ORIGIN_FILTER = "ORIGIN_FILTER"
export const ORDER_BY_RATING = "ORDER_BY_RATING"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const FETCH_GENRES = "FETCH_GENRES"
export const GET_PLATFORMS = "GET_PLATFORMS";




export function getVideogames (){
    return async function (dispatch){
        const response = await axios ("http://localhost:3001/videogames/");
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: response.data
        })
    };
    
}

export function getByName (name){
    return async function (dispatch){
        const response = await axios (`http://localhost:3001/videogames/name/?name=${name}`);
        return dispatch({
            type: "GET_BY_NAME",
            payload: response.data
        })
    };



    
}
export function getById(id) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        const data = response.data; 
        const filteredData = {
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image,
          rating: data.rating,
          released:data.released,
          platforms: data.platforms,
          genres:data.genres
        };
  
        return dispatch({
          type: GET_BY_ID,
          payload: filteredData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  };
  export const getPlatforms = () => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/videogames`);
      const allVideogames = response.data;
  
      const allPlatforms = allVideogames.flatMap((game) =>
        game.platforms.split(', ')
      );
  
      const uniquePlatforms = [...new Set(allPlatforms)];
  
      const platformList = uniquePlatforms.map((platform) => ({
        name: platform,
      
      }));
  
      return dispatch({
        type: GET_PLATFORMS,
        payload: platformList,
      });
    } catch (error) {
      return error;
    }
  };
  
  export const postVideogame = (game) => async () => {

    try {
  
       const response = await axios.post(`http://localhost:3001/videogames`, game);
      
      return response;
      
    } catch (error) {
      return error;
    }
  };

  


 
  
  

  export const fetchGenres = () => {
    const endpoint = "http://localhost:3001/genres";
  
    return async (dispatch) => {
      const { data } = await axios(endpoint);
      dispatch({
        type: FETCH_GENRES,
        payload: data,
      });
    };
  };
  export const genresFilter = (selectedGenre) => {
    return {
      type: GENRES_FILTER,
      payload: selectedGenre,
    };
  };

  export const originFilter = (origin) => {
    return {
      type: ORIGIN_FILTER,
      payload: origin,
    };
  };

  export const orderByName = (order) => {
    return {
      type: ORDER_BY_NAME,
      payload: order,
    };
  };
  export const orderByRating = (order) => {
    return {
      type: ORDER_BY_RATING,
      payload: order,
    };
  };



  

// http://localhost:3001/videogames/