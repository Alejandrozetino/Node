// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const socket = io();

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has( 'escritorio' ) ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none';



socket.on('connect', () => {
    
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    
    btnAtender.disabled = true;

});

socket.on('ultimo-ticket', ( ticket ) => {
    
    lblNuevoTicket.innerText = `Ticket ${ticket}`;

});

socket.on('tickets-pendientes', ( numeroTicketPendientes ) => {
    
    lblPendientes.innerText = numeroTicketPendientes;

});

btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket', { escritorio }, ( { ticket, msg } ) => {
        console.log(msg);
        if( msg ) {
            lblTicket.innerText = `Nadie`;
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`;
    });

});