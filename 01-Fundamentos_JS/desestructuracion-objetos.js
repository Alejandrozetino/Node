
const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre(){
        return `${this.nombre} ${this.apellido} ${this.poder}`;
    }
}

console.log( deadpool.getNombre() );

//DESESTRUCTURACIÓN del objeto deadpool.

//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
//const poder = deadpool.poder;

const { nombre, apellido, poder } = deadpool;

console.log( nombre, apellido, poder );

const heroes = [ 'Deadpool', 'Superman', 'Batman' ];

const [ h1, h2, h3 ] = heroes;

console.log( h1, h2, h3 );

