const fs = require('fs');
const colors = require('colors')

const crearArchivo = async ( base, listar, hasta ) => {

    try{
        let salida = '';

        for(var i = 1; i <= hasta; i++){
            salida += ( `${base} x ${i} = ${base * i}\n` );
        }

        /*fs.writeFile( `tabla-${base}.txt`, salida, (err) => {
            if( err ) throw err;
            console.log(`tabla-${base}.txt creado con exito.`);
        });*/

        if( listar ) console.log( salida );

        fs.writeFileSync( `./salida/tabla-${base}.txt`, salida );
        return `tabla-${base}.txt`;

    }catch( err ){

        throw 'No se pudo crear el archivo';
        
    }
};

module.exports = {
    crearArchivo
}