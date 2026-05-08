//var express = require('express');
import express from 'express';
const router = express.Router();
//import logger
import logger from '../lib/winston.js';

/* GET home page. *///eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Proyecto Asombroso✨'});
});

//Rutas para pruebas de logs
router.get("/test-logs",(req, res)=>{
  logger.info('Ruta de prueba de log accedida');
  res.send('se crearon logs de prueba');
  //generar logs
  logger.error('Esto es una prueba de log tipo Error');
  logger.warn('Esto es una prueba de log tipo Warn');
  logger.info('Esto es una prueba de log tipo Info');
  logger.http('Esto es una prueba de log tipo HTTP');
  logger.debug('Esto es una prueba de log tipo Debug');
  


  //estructurando respuesta
  res.json({
    message: 'Se crearon logs de prueba',
    archivos: [
      "logs/app-YYYY-MM-DD.log",
      "logs/app-readable.log",
      "logs/error.log",
    ]
});


//Rutas para prueba de exception y rejections
if (process.env.NODE_ENV !== 'production') {
  //Habilitar ruta para probrar exceptionHandler
  //acceso: GET /test-exception
  router.get("/test-exception",(req, res)=>{
    response.json({
      message: "Excepcion lanzada. revisa logs/exception.log"
    })
    //lanzar una excepcion 
    setTimeout(()=>{
      throw new Error("Excepcion no capturada lanzada desde ruta /test-exception");
    }, 300);
  })
  
  //Ruta para Rejection
  //Acceso: GET /test-rejection
  router.get("/test-rejection",(req, res)=>{
    res.json({
      message: "Promesa rechazada. Revisa logs/rejection.log"
    })
    //Generando Rejection 
    Promise.reject(new Error("Promesa rechazada sin catch"));
  })
}

  //Habilitar ruta para probar rejectionHandler 
export default router;