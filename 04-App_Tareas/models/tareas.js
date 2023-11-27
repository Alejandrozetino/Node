import { Tarea } from "../models/tarea.js";

class Tareas{

    _listado = {};

    get listadoArry(){

        const listado = [];
        
        //Barre 1 a 1 las llaves en un listado y retorna un arreglo de todas las llaves
        Object.keys( this._listado ).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        }); 

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( t => this._listado[ t.id ] = t );
    }

    crearTarea( descripcion = '' ){
        
        const tarea = new Tarea( descripcion );
        this._listado[ tarea.id ] = tarea;
    }

    listadoCompleto(){

        this.listadoArry.forEach( (tarea, idx) => {

            const index = `${idx + 1}`.green; 
            let { descripcion, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completado'.green
                            : 'Pendiente'.red;

            console.log(`${ index } ${ descripcion } :: ${ estado }`);

        });
    }

    listarPendientesCompletadas( completadas = true ){
        
        let index = 1;

        this.listadoArry.forEach( tarea => {

            let { descripcion, completadoEn } = tarea;

            if( completadoEn && completadas ){
                console.log(`${ ( index + '.' ) .green } ${ descripcion } :: ${ completadoEn.green }`);
                index++;
            }
            
            if( !completadoEn && !completadas){
                console.log(`${ ( index + '.' ) .green } ${ descripcion } :: ${ 'Pendiente' .red }`);
                index++;
            } 

        });
    }

    borrarTarea( id = '' ){

        if( this._listado[ id ] ){
            delete this._listado[ id ];
        }
    }

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[ id ];

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArry.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ){
                this._listado[tarea.id].completadoEn = null;
            }

        });
    }
    
}

export { Tareas };