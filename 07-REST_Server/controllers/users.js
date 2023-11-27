const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGET = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    /*const users = await User.find({ state: true })
        .skip( Number(desde) )
        .limit( Number(limite) );

    const total = await User.countDocuments({ state: true });*/

    const [ total, users ] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true })
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.json({
        total,
        users
    });
}

const usersPUT = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        // Ecriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );
    
    res.json(user);
}

const usersPOST = async( req, res = response ) => {

    const { nombre, correo, password, role } = req.body;
    const user = new User({ nombre, correo, password, role });

    // Ecriptar la contraseña
        // salt = número de vueltas para el nivel de encriptación
        // Entre más alto el número más seguro, el valor por defecto es 10
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const usersDELETE = async( req, res = response ) => {

    const { id } = req.params;

    // Borrar fisicamente
    //const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false} );

    res.json( user );
}

module.exports = {
    usersGET,
    usersPUT,
    usersPOST,
    usersDELETE,
}