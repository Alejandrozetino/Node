const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligarorio' ]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligarorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligaroria' ]
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );
