const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            uploads: '/api/uploads',
            usuarios: '/api/users',
            productos: '/api/productos',
        }

        // Conectar a base de datos
        this.conectarBD();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación

        this.routes();
    }

    async conectarBD(){
        await dbConnection();
    }

    middlewares(){

        // CORS: configurar que dominios pueden enviar peticiones
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        
        this.app.use( this.paths.auth, require( '../routes/auth' ) );
        this.app.use( this.paths.buscar, require( '../routes/buscar' ) );
        this.app.use( this.paths.categorias, require( '../routes/categorias' ) );
        this.app.use( this.paths.uploads, require( '../routes/uploads' ) );
        this.app.use( this.paths.usuarios, require( '../routes/users' ) );
        this.app.use( this.paths.productos, require( '../routes/productos' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;