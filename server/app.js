import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Importando winston para logging
import logger from './lib/winston.js';

// Importando enrutadores
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authorRouter from './routes/author.js';

// Configuración de handlebars
import { configureHandlebars } from './lib/handlebars.js';

// 🔧 Reemplazo correcto de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

logger.info("Creando la instancia de express");
const app = express();

logger.info("Inicia configuración de express");
configureHandlebars(app);

// 🔥 Morgan → Winston
app.use(morgan('dev', {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estáticos generales
app.use(express.static(path.join(__dirname, '../public')));

// Configuración para producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../dist')));
  console.log("Ruta producción: " + path.join(__dirname, '../dist'));
}

// Rutas
app.use(['/', '/index'], indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;