const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, validarRolAdmin } = require('../middlewares');
const { existeProducto, existeCategoria } = require('../helpers/db_validators');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');


const router = Router();

/** 
 * http://localhost:8080/api/productos
*/
router.get( '/', obtenerProductos );

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto );

router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto );

router.delete('/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto );

module.exports = router;