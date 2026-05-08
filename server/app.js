import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//impotando wiston logger
import logger from './lib/winston.js';
import hbs from 'hbs';
// routers
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authorRouter from './routes/author.js';

// helpers 
import { registerHelpers } from './lib/helpers.js';

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// registrar helpers correctamente
registerHelpers(hbs);

// Redirigiendo el flujo de logs de morgan
//a wiston
// morgan ----> wiston[logs]---->Wiston-----> transports (archivos, consola, etc)
app.use(morgan('dev', {
   write: (msg) => logger.http(msg.trim()),
   }
  ));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// estáticos
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist', '.vite')));
}

app.use(express.static(path.join(__dirname, '..', 'public')));

// rutas
app.use(['/', '/index'], indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
//eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;