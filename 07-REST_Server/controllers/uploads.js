const { response } = require('express');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivo } = require('../helpers');
const { User, Producto } = require('../models')


const cargarArchivo = async( req, res = response ) => {

    try {
        const nombreArchivo = await subirArchivo( req.files );
    } catch ( error ) {
        res.status(400).send({ error });
    }

    res.json({ nombreArchivo });
}

const actualizarImagen = async( req, res = response ) => {

  const { id, coleccion } = req.params;
  let modelo;

  switch( coleccion ) {
    case 'usuarios':
      modelo = await User.findById( id );
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }

    break;

    case 'productos':
      modelo = await Producto.findById( id );
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un productos con el id ${id}`
        });
      }
      
    break;

    default:
      return res.status(500).json({
        msg: 'Se me olvidó validar esto'
      });
  }

  // Limpiar imágenes previas
  if( modelo.image ) {

    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.image );

    if( fs.existsSync( pathImagen ) ) {
      fs.unlinkSync( pathImagen );
    }
    
  }

  const nombreArchivo = await subirArchivo( req.files, undefined, coleccion );
  modelo.image = nombreArchivo;

  await modelo.save();

  res.json( modelo );
}

const actualizarImagenCloudinary = async( req, res = response ) => {

  const { id, coleccion } = req.params;
  let modelo;

  switch( coleccion ) {
    case 'usuarios':
      modelo = await User.findById( id );
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }

    break;

    case 'productos':
      modelo = await Producto.findById( id );
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un productos con el id ${id}`
        });
      }
      
    break;

    default:
      return res.status(500).json({
        msg: 'Se me olvidó validar esto'
      });
  }

  // Limpiar imágenes previas
  if( modelo.image ) {

    const nombreArr = modelo.image.split('/');
    const nombre = nombreArr[ nombreArr.length - 1 ];
    const [ public_id ] = nombre.split('.');

    cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
  modelo.image = secure_url;

  await modelo.save();

  res.json( modelo );
}

const mostrarImagen = async( req, res = response ) => {

  const { id, coleccion } = req.params;
  let modelo;

  switch( coleccion ) {
    case 'usuarios':
      modelo = await User.findById( id );
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }

    break;

    case 'productos':
      modelo = await Producto.findById( id );
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un productos con el id ${id}`
        });
      }
      
    break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  // Limpiar imágenes previas
  if( modelo.image ) {
    console.log('el modelo si tenia imagen');
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.image );

    if( fs.existsSync( pathImagen ) ) {
      return res.sendFile( pathImagen );
    }
    
  }

  const pathNoImagen = path.join( __dirname, '../assets/no-image 2.jpg' );
  return res.sendFile( pathNoImagen );
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
}