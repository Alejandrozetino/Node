const hbs = require('hbs');
const express = require('express');
const app = express();
require('dotenv').config();

// Handlebars
// Renderizar vistas del lado del backen y servirlas luego
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials', function (err) {} );


// Servir contenido estático
// MiddleWare
//app.use( express.static('public') );
app.use( express.static('templated-roadtrip') );

app.get('/', function (req, res) {
    //res.send('Hello World');
    res.render( 'home', {
        nombre: 'Alejnadro Zetino',
        titulo: 'Servido desde Node'
    } );
});

app.get('/elements', function (req, res) {
    //res.send('Hello World');
    res.render( 'elements', {
        nombre: 'Alejnadro Zetino',
        titulo: 'Servido desde Node'
    } );
});

app.get('/generic', function (req, res) {
    //res.send('Hello World');
    res.render( 'generic', {
        nombre: 'Alejnadro Zetino',
        titulo: 'Servido desde Node'
    } );
});

app.get('/generic', function (req, res) {
    res.sendFile( __dirname + '/templated-roadtrip/generic.html');
});

app.listen( process.env.PORT );