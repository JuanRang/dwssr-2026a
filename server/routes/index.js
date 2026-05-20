import express from 'express';
const router = express.Router();
//Import Logger
import Logger from '../lib/winston.js';

/* GET home page. */
//eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
  res.render('index', { title: '✨Proyecto asombroso' });
});

//Rutas para pruebas de logs
router.get("/test-logs",(reg,res)=>{
  //Generar logs
  Logger.error("Esta es una prueba del log tipo Error");
  Logger.warn("Esto es una prueba de log tipo Warn");
  Logger.info("Esto es una prueba de log tipo info");
  Logger.http("Esto es una prueba de log tipo http");
  Logger.debug("Esto es una prueba de log tipo debug");

  //Estructurando respuesta
  res.json({
    message: "Se crearon logs de prueba",
    archivos:[
    "logs/app-YYYY-MM-DD.log",
    "logs/app-readble.log",
    "logs/error.log",
    ]
  })
});

//Rutas para pruebas de excepcion y rejections 
if(process.env.NODE_ENV !== "production"){
  //Habilitando ruta para probar exceptionesHandlers
  //Acceso: GET /test-exception
  router.get("/test-exception", (req, res) => {
    res.json({
      message: "Excepcion lanzada. Revisa logs/exceptions.log"
    })
    //Lanzando una excepcion 
    setTimeout(() => {
      throw new Error("Excepcion no capturada para pruebas");
    }, 300);
  })
  
  //Ruta para rejections
  //Acceso GET /test-rejection
  router.get("/test-rejection", (req, res) => {
    res.json({
      message: "Promesa rechazada. Revisa logs/rejections.log"
    })
    //generando rejection 
  Promise.reject(new Error("Promesa rechazada sin cathc"));
  })
}
export default router;