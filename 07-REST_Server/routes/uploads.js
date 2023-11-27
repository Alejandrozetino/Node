const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivo } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();

router.get( '/:coleccion/:id', [
    check('id', 'El id debe ser un id de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos
], mostrarImagen )

router.post( '/', validarArchivo, cargarArchivo );

router.put( '/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id no es un id de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos
], actualizarImagenCloudinary );

module.exports = router;