const { Router } = require('express');
// Importar todos los routers;
const videogamesRouter = require ("./route/videogamesRouter")
const genresRouter = require ("./route/genresRouter")
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use ("/videogames", videogamesRouter)
router.use ("/genres", genresRouter)




module.exports = router;
