import express from 'express';

const router = express.Router();

/* GET author page. */
router.get('/', (req, res) => {
  res.render('author', {    
    nombre: 'Juan Rangel Neri', 
    rol: 'Desarrollador Full Stack',
    descripcion: 'Estudiante del Instituto Tecnológico de Gustavo A. Madero.' 
  });
});

export default router;