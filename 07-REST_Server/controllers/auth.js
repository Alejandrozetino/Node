const { response } = require('express');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar_JWT');
const { googleVerify } = require('../helpers/google_verify');

const login = async(req, res = response) => {

    const { correo } = req.body;

    try {

        // Verificar si el correo existe
        const user = await User.findOne({ correo });
        if( !user ){
            return res.status(400).json({
                msg: 'El correo no es válido'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con su administrador'
        });
    }
}

const googleSingIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify( id_token );

        let usuario = await User.findOne({ correo });

        if( !usuario ){

            const data = {
                nombre,
                correo,
                password: ':p',
                image: img,
                role: 'USER_ROLE',
                google: true
            };

            usuario = new User( data );
            await usuario.save();
        }

        if( !usuario.state ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    } catch( error ) {
        console.log( error );
        return res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }    
}

module.exports = {
    login,
    googleSingIn,
}
