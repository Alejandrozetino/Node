const { response } = require("express");
const mongoose = require("mongoose");

const { Producto } = require('../models');

const obtenerProductos = async( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments({ estado: true}),
        Producto.find({ estado: true })
            .populate( "categoria" )
            .populate( "usuario" )
            .skip( Number(desde) )
            .limit( Number(desde) )
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProducto = async( req, res = response ) => {
    
    const { id } = req.params;
    const producto = await Producto.findById( id )
        .populate( "categoria" )
        .populate( "usuario" );

    res.json(
        producto
    );
}

const crearProducto = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();
    const { descripcion, precio, disponible, categoria } = req.body;
    const producto = new Producto({ nombre, descripcion, precio, disponible, categoria });

    const productoDB = await Producto.findOne({ nombre });
    if( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }
    
    producto.usuario = req.usuario._id;

    await producto.save();

    res.status(201).json( producto );
}

const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, resto, { new: true} );

    res.json(
        producto
    );
}

const borrarProducto = async( req, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false}, { new: true } );

    res.json( producto );
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}
