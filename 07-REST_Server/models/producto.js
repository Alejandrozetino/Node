const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        require: true,
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        default: 0
    },
    disponible: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    image: {
        type: String
    },
});

module.exports = model( 'Producto', ProductoSchema );