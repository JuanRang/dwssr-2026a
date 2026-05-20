import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { create as createHandlebars } from 'express-handlebars';

// Importando la configuración de Vite 
import { registerViteHelper } from './vite.js';

// 🔧 Fix correcto de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// exportar la función de configuración 
export function configureHandlebars(app) {
    // creando instancia del motor handlebars
    const exphbs = createHandlebars({
        extname: '.hbs',
        defaultLayout: 'main'
    });

    // registrar helpers con instancia global de handlebars
    registerViteHelper(exphbs.handlebars);

    // motor de vistas
    app.engine('hbs', exphbs.engine);

    // extensión de vistas
    app.set('view engine', 'hbs');

    // ruta de vistas
    app.set('views', path.join(__dirname, '..', 'views'));
}