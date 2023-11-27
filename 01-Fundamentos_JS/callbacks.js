
setTimeout( function() {
    console.log( 'Hola Mundo' );
} , 1000 );

const getUsuarioById = ( id, callback ) => {

    const usuario = {
        //id: id
        id,
        nombre: 'Alejandro'
    }

    setTimeout(() => {
       callback( usuario ); 
    }, 1500);
}

getUsuarioById( 10, ( usuario ) => {
    console.log( usuario );
});