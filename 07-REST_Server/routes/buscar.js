const { Router } = require('express');
const { Buscar } = require('../controllers/buscar');

const router = Router();

router.get( '/:coleccion/:termino', Buscar )

module.exports = router;