const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');

//Config
app.set('port', process.env.PORT || 3000); // En el caso que se monte en la nube, ocupa el puerto que ellos dan, si no, sera el 3000

//Middleware
app.use(morgan('dev')); //Para ver mensajes formateados para dev
app.use(express.json()); //Va a comprobar que la peticion sea JSON. Antes se usaba bodyParser

//Rutas
app.use('/api/tasks', require('./routes/task.routes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, '/public')))



//Inicializacion del servidor

app.listen(app.get('port'), () => {
    console.log(`Corriendo en el puerto ${app.get('port')}`)
});

/*

== COMENTARIOS ==
Express = modulo de servidor
Morgan = Ver por consola las peticiones que fueron hechas por el navegador
MongoDB = brew tap y dsps esta el mongo-db

*/