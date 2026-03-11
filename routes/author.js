var express = require('express');
var router = express.Router();


/* GET author page. */
router.get('/', function(req, res, next) {
  res.render('author', {    
    nombre: 'Juan Rangel Neri', 
    rol: 'Desarrollador Full Stack',
    descripcion: 'Estudiante del Instituto Tecnológico de Gustavo A. Madero.' 
  });
});

module.exports = router;