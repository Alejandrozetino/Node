const TicketControl = require("../models/ticket_control");


const ticketControl = new TicketControl();

// Controlador de toda la comunicación por sockets
const socketController = (socket) => {

    socket.emit( 'ultimo-ticket', ticketControl.ultimoTicket );
    socket.emit( 'estado-actual', ticketControl.ultimos4Tickets );
    socket.emit( 'tickets-pendientes', ticketControl.ticketsPendientes.length );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguienteTicket();

        socket.broadcast.emit( 'tickets-pendientes', ticketControl.ticketsPendientes.length );

        callback( siguiente );
    });

    socket.on('atender-ticket', ( { escritorio }, callback ) => {

        if( !escritorio ) {
            return callback({
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4Tickets );
        socket.emit( 'tickets-pendientes', ticketControl.ticketsPendientes.length );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.ticketsPendientes.length );

        if( !ticket ) {

            return callback({
                msg: 'Ya no hay tickets pendientes'
            });

        }else{

            callback({
                ticket
            });
            
        }
    });
}

module.exports = {
    socketController,
}
