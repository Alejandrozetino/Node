
const { Router } = require('express');
const { usersGET, usersPUT, usersPOST, usersDELETE } = require('../controllers/users');
const { check } = require('express-validator');

const { validarCampos, validarJWT, validarRolAdmin, tieneRole } = require('../middlewares');
const { roleIsValid, emailExist, userIdExist } = require('../helpers/db_validators');

const router = Router();

router.get( '/', usersGET );

router.put( '/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( userIdExist ),
    check('role').custom( roleIsValid ),
    validarCampos
], usersPUT );

router.post( '/', [
    // Middleware de validación de datos de usuario
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 carácteres').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExist ),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( roleIsValid ),
    validarCampos,
], usersPOST );

router.delete( '/:id', [
    validarJWT,
    //validarRolAdmin,
    tieneRole('ADMIN_ROLE', 'SUPERADMIN_ROLE'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( userIdExist ),
    validarCampos,
], usersDELETE );


module.exports = router;
