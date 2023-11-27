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

const getEmpleado = ( id ) => {

    return new Promise( ( resolve, reject ) => {

        const empleado = empleados.find( (e) => e.id === id )?.nombre;

        ( empleado )
            ? resolve( empleado )
            : reject( `No se encontró el empleado con id ${id}` )
    } );
}

const getSalario = ( id ) => {

    return new Promise(( resolve, reject ) => {
        
        const salario = salarios.find( (e) => e.id == id )?.salario;

        ( salario )
            ? resolve( salario )
            : reject( `No se encontro ningun salario on id ${id}` )
    });
}


const getInfoUsuario = async ( id ) => {
    
    try{
        const empleado = await getEmpleado( id );

        return empleado;
    }catch( err ){
        return err;
    }
}

const id = 4;

getInfoUsuario( id )
    .then( empleado => console.log( empleado ) );
