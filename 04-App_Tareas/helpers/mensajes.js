import colors from 'colors';

const mostrarMenu = () => {

    return new Promise(resolve => {
        console.log('=============================' .green);
        console.log('    Seleccione una opción    ' .green);
        console.log('=============================\n' .green);

        console.log(`${ '1.' .green } Crear tarea`);
        console.log(`${ '2.' .green } Listar tareas`);
        console.log(`${ '3.' .green } Listar tareas completadas`);
        console.log(`${ '4.' .green } Listar tareas pendientes`);
        console.log(`${ '5.' .green } Completar tarea(s)`);
        console.log(`${ '6.' .green } Borrar tarea`);
        console.log(`${ '0.' .green } Salir \n`);

        //Configuración básica para la interacción del usuario con la consola
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //.question() para mostrar info al usuario
        readLine.question( 'Seleccione una opción: ', (opt) => {
            readLine.close();
            resolve(opt);
        })
    });
    
}

const pausa = () => {

    return new Promise( resolve => {
        //Configuración básica para la interacción del usuario con la consola
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //.question() para mostrar info al usuario
        readLine.question( `\nPresione ${ 'ENTER' .green } para continuar.\n`, (opt) => {
            readLine.close();
            resolve();
        })
    });
    
}

module.exports = {
    mostrarMenu,
    pausa,
}