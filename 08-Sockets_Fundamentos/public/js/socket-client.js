const socket = io();

// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

//on: para escuchar eventos
socket.on('connect', () => {
    console.log('Conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('enviar-mensaje', ( payload ) => {
    console.log( payload );
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    };

    //console.log(mensaje);

    // enviar un mensaje al servidor
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log( 'Desde el server para el cliente que emitio la acción: ', id );
    });
});