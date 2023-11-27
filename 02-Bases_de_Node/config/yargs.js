const argv = require('yargs')
            .option('b', {
                alias: 'base' ,
                type: 'number' ,
                demandOption: true ,
                describe: 'Es la base de la tabla de multiplicar'
            })
            .option('l', {
                alias: 'listar' ,
                type: 'boolean' ,
                default: false ,
                describe: 'Muestra la tabla de multiplicar en consola'
            })
            .option('h', {
                alias: 'hasta' ,
                type: 'number' ,
                demandOption: true ,
                describe: 'Número delimitador de la tabla'
            })
            .check( ( argv, options ) => {
                if( isNaN(argv.b ) ) {
                    throw 'La base tiene que ser un número'
                }

                if( isNaN( argv.h ) ){
                    throw 'El delimitador tiene que ser un número'
                }

                return true;
            })
            .argv;

module.exports = argv;