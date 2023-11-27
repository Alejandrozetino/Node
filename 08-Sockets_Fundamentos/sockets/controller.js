// Controlador de toda la comunicación por sockets

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id );

    // socket.on: escuchando cuando el cliente envia algo o realiza algo
    socket.on('disconnect', () => {
        console.log( 'Cliente desconectado', socket.id );
    });

    socket.on('enviar-mensaje', ( payload, callback ) => {
        //console.log( payload );
        const id = 123456;

        // este callback es la referencia a la función socket.emit( 'enviar-mensaje'... del cliente (socket-client.js)
        callback( id );

        // enviar mensaje a todos los clientes conectados
        // io.emit: cuando el servidor (socket) emite el mensaje
        //this.io.emit( 'enviar-mensaje', payload );
        socket.broadcast.emit( 'enviar-mensaje', payload );
    });
}

module.exports = {
    socketController,
}
