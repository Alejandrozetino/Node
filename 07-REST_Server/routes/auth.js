const { Router } = require('express');
const { check } = require('express-validator');

const { emailExist, userActive, validPassword } = require('../helpers/db_validators');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');


const router = Router();

router.post( '/login', [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('correo').custom( userActive ),
    check(['correo, password']).custom((value, { req }) => {
        const { correo, password } = req.body;
    
        return validPassword(correo, password );
    }),
    validarCampos,
], login );

router.post( '/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos,
], googleSingIn );

module.exports = router;
