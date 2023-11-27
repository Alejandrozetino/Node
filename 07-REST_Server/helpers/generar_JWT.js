const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject ) => {
        const payload = { uid };

        jwt.sign( payload, process.env.SECREATORPRIVATEKEY, {
            expiresIn: '1h' // Expira en 1 hora
        }, ( err, token ) => {

            if( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' );
            }else{
                resolve( token );
            }
            
        })
    })
}

module.exports = {
    generarJWT,
}
