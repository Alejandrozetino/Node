const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN );
        console.log( 'Base de Datos iniciada' );

    } catch ( error ) {

        console.log( error );
        throw new Error( 'Error a la hora de iniciar la Base de Datos' );

    }
}

module.exports = {
    dbConnection,
}