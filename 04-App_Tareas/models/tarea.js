import {v4 as uudi} from 'uuid'; 

class Tarea {

    id = '';
    descripcion = '';
    completadoEn = null;

    constructor( _descripcion ){
        this.id = uudi();
        this.descripcion = _descripcion;
    }
}

export { Tarea }