const path = require('path');
const fs = require('fs');

class Ticket {

    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimoTicket      = 0;
        this.diaActual         = new Date().getDate();
        this.ticketsPendientes = [];
        this.ultimos4Tickets   = [];

        this.init();
    }

    get toJson() {
        return {
            ultimoTicket: this.ultimoTicket,
            diaActual: this.diaActual,
            ticketsPendientes: this.ticketsPendientes,
            ultimos4Tickets: this.ultimos4Tickets,
        };
    }

    init() {
        const { diaActual, ticketsPendientes, ultimoTicket, ultimos4Tickets } = require('../db/data.json');

        if( diaActual === this.diaActual ) {
            this.ticketsPendientes = ticketsPendientes;
            this.ultimoTicket = ultimoTicket;
            this.ultimos4Tickets = ultimos4Tickets;
        } else {
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );
    }

    siguienteTicket() {
        this.ultimoTicket += 1;
        
        const ticket = new Ticket( this.ultimoTicket, null );
        this.ticketsPendientes.push( ticket );

        this.guardarDB();

        return 'Ticket ' + ticket.numero;
    }

    atenderTicket( escritorio ) {
        // No tenemos tickets
        if ( this.ticketsPendientes.length === 0 ){
            return null;
        }

        const ticket =  this.ticketsPendientes.shift(); //this.ticketsPendientes[0];
        ticket.escritorio = escritorio;

        this.ultimos4Tickets.unshift( ticket );
        
        if( this.ultimos4Tickets.length > 4 ) {
            this.ultimos4Tickets.splice( -1, 1 );
        }

        this.guardarDB();

        return ticket;
    }
}


module.exports = TicketControl;
