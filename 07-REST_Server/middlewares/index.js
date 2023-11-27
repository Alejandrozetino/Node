const validarCampos = require('../middlewares/validar_campos');
const validarJWT = require('../middlewares/validar_JWT');
const validaRoles = require('../middlewares/validar_roles');
const validarArchivo = require('../middlewares/validar_archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivo,
}