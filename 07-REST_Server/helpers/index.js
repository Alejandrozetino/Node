const dbValidators = require('./db_validators');
const generarJWT   = require('./generar_JWT');
const googleVerify = require('./google_verify');
const subirArchivo = require('./subir_archivo');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}
