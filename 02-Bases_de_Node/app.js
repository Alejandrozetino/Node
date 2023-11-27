const {crearArchivo} = require('./helpers/multiplicar')
const  argv = require('./config/yargs')
const colors = require('colors')

console.clear();

//Tomar argumentos desde la consola: process.argv
//const [ , , arg3 ] = process.argv;
//const [ , base ] = arg3.split('=');

//console.log( process.argv );
//console.log( argv );

//console.log( 'base de yargs: ', argv.base );

//const base = 5;

crearArchivo( argv.base, argv.listar, argv.hasta )
    .then( nombreArchivo => console.log(nombreArchivo .green, 'creado' .green) )
    .catch( err => console.log( err ) );
