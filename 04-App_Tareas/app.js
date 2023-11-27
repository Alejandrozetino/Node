import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }

    do{
        opt = await inquirerMenu();
        
        switch(opt){
            case '1': //Crear tarea
                const descripcion = await leerInput('Descripción:');
                tareas.crearTarea( descripcion );
            break;

            case '2': //Listar tareas
                tareas.listadoCompleto();
            break;

            case '3': //Listar tareas completas
                tareas.listarPendientesCompletadas( true );
            break;

            case '4': //Listar tareas pendientes
                tareas.listarPendientesCompletadas( false );
            break;

            case '5': //Completar tarea(s)
                const ids = await mostrarListadoChecklist( tareas.listadoArry );
                tareas.toggleCompletadas( ids );
            break;

            case '6': //Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArry );

                if( id !== '0' ){
                    const ok = await confirmar( '¿Está seguro que desea borrarlo?' );
                
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log( 'Tarea borrada correctamente' );
                    }
                }
                
            break;
        }

        guardarDB( tareas.listadoArry );

        await pausa();

    }while( opt !== '0' )    

}

main();