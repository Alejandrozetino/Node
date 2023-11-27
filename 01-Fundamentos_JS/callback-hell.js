const empleados = [
    {
        id: 1,
        nombre: "Alejandro"
    },
    {
        id: 2,
        nombre: "José"
    },
    {
        id: 3,
        nombre: "Linda"
    },
]

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    },
]

const getEmpleado = ( id, callback ) => {

    const empleado = empleados.find( (e) => e.id === id )

    if( empleado ){
        callback( null, empleado );
    }else{
        callback( `No existe el Empleado con id ${ id }` );
    }
    
}

const getSalario = ( id, callback ) => {

    const salario = salarios.find( (s) => s.id === id )

    if( salario ){
        callback(null ,salario);
    }else{
        callback(`No existe el Salario con ID ${ id}`);
    }

}

//console.log( getEmpleado( 2 ) );

getEmpleado( 10, ( err, empleado ) => {

    if( err ){
        return console.error("Error al obtener el empleado.", err);
    }

    console.log(empleado);
})

getSalario( 2, (err, salario) => {

    if( err ){
        return console.log( err );
    }

    console.log( salario );
})