const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    if( !token ) {
        return res.status(401).json({ 
            msg: 'No hay un token en la petición' 
        });
    } 

    try {
        
        const { uid } = jwt.verify( token, process.env.SECREATORPRIVATEKEY );

        // Leer el usuario que corresponde al uid
        const usuarioAutenticado = await User.findById( uid );

        // Validar que pudo encontrar un usuario
        if( !usuarioAutenticado ){
            return res.status(401).json({ 
                msg: 'Token no válido - Usuario eliminado' 
            });
        }

        // Verificar si el uid tiene el estado true
        if( !usuarioAutenticado.state ){
            return res.status(401).json({ 
                msg: 'Token no válido - Usuario eliminado' 
            });
        }

        req.usuario = usuarioAutenticado;

        next();
        
    } catch ( error ) {
        console.log(error);
        return res.status(401).json({ 
            msg: 'Token no válido' 
        });
    }
}

module.exports = {
    validarJWT,
}
