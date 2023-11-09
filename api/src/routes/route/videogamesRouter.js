const {Router} = require ("express")
const {getVideogameHandler} = require("../../handlers/videogamesHandlers")
const {getDetailHandler} = require("../../handlers/videogamesIdHandrels")
const getVideogameByNameHandler = require ("../../handlers/videogamesNameHandrels")
const postVideogame= require ("../../handlers/videogamesPostsHandlers")




const videogamesRouter = Router ()


videogamesRouter.post ("/", postVideogame);


 videogamesRouter.get ("/", getVideogameHandler);

 videogamesRouter.get ("/name", getVideogameByNameHandler);


 videogamesRouter.get ("/:idVideogame", getDetailHandler);












module.exports = videogamesRouter
