const bcryptjs = require('bcryptjs');

const { Categoria, Role, User, Producto } = require('../models');

const roleIsValid = async(role = '') => {

    const existRole = await Role.findOne({ role });
    if( !existRole ) {
        throw new Error(`El rol ${role} no es válido`);
    }
}

const emailExist = async(correo = '') => {

    const existEmail = await User.findOne({ correo });
    if( existEmail ) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const userIdExist = async( id ) => {

    const existUsuario = await User.findById(id);
    if( !existUsuario ) {
        throw new Error(`El id ${id} no existe`);
    }
}

const userActive = async( correo = '' ) => {

    const userActive = await User.findOne({ correo });
    if( !userActive.state ){
        throw new Error(`Este usuario ha sido desactivado, por favor contacte al administrador del sistema.`);
    }
}

const validPassword = async( correo = '', password = '' ) => {

    const user = await User.findOne({ correo });
    const validPassword = bcryptjs.compareSync( password, user.password );

    if( !validPassword ){
        throw new Error( 'La contraseña no es correcta' );
    }
}

const existeCategoria = async( id ) => {

    const existeCategoria = await Categoria.findById( id );
    if( !existeCategoria ) {
        throw new Error(`El id ${ id } no existe en la base de datos`);
    }
}

const existeProducto = async( id ) => {

    const existeProducto = await Producto.findById( id );
    if( !existeProducto ) {
        throw new Error(`El id ${ id } no existe en la base de datos`);
    }
}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error(`La colección ${coleccion} no es permitida. Las permitidas son ${colecciones}`);
    }

    return true;
}

module.exports = {
    roleIsValid,
    emailExist,
    userIdExist,
    userActive,
    validPassword,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas,
}