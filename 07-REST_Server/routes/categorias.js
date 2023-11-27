const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, validarRolAdmin } = require('../middlewares');
const { existeCategoria } = require('../helpers/db_validators');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');


const router = Router();

/** 
 * http://localhost:8080/api/categorias
*/
router.get( '/', obtenerCategorias );

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria );

router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria );

router.delete('/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria );

module.exports = router;