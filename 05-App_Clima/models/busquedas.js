import fs from FileSystem;
import axios from 'axios';

class Busquedas {

    historial = [];
    dbPath = './DB/database.json';

    constructor(){
        this.leerBD();
    }

    get paramsMapbox(){
        return {
            'limit': 5,
            'proximity': 'ip',
            'language': 'es',
            'access-token': process.env.MAPBOX_KEY,
        };
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ');
        })
    }

    getParamsWeather(){
        return {
          appid: process.env.OPENWEATHER_KEY,
          units: 'metric',
          lang: 'es'
        }
    }

    async ciudad( lugar = '' ){

        try{
            //Petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const respuesta = await instance.get();

            return respuesta.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        }catch{
            return [];    
        }
        
    }

    async climaLugar( lat, lon ){

        //Petición http
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: { ...this.getParamsWeather, lat, lon }
        });

        const respuesta = await instance.get();
        const { weather, main } = respuesta.data;

        try{

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
    

        }catch( error ){
            console.log( error );
        }
    }

    agregarHistorial( lugar = '' ){

        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift( lugar.toLocaleLowerCase() );
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial,
        };

        fs.writefileSync( this.dbPath, JSON.stringify( payload ) );
    }

    leerBD(){
        if( !fs.existsSync( this.dbPath ) ) return;

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );
        const data = JSON.parse( info );

        this.historial = data.historial;
    }
}

export{
    Busquedas,
}