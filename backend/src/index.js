require("./Configs/config");
require("./Configs/database");
console.clear();

// ---------------------------------- //
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
var helmet = require('helmet');

// Initialize the application
const app = express();
app.disable('x-powered-by');

//static files
app.use('/exports', express.static(path.resolve('exports')))

// Middlewares
app.use(helmet());
app.use('/static', express.static(__dirname + '/reportes'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'))
app.set('trust proxy', true);

// Cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Habilitar cors (DE MANERA LIMITADA)
// En esta ocasion sera abierta para mi
/*const whitelist=['http://senamecuida.sertec-csge.com.co'];
const corsOptions={
    origin: (origin,callback) => {

        const existe = whitelist.some(dominio => dominio=== origin);

        if (existe) {
            callback(null,true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}*/

// Esta limita el acceso
// app.use(cors(corsOptions));

// Esta es abierta para todo el mundo.
app.use(cors());


//Routes
app.use("/api/visitante", require('./Routes/VisitantesRoutes/visitanteRoutes'));
app.use("/api/funcionario", require('./Routes/FuncionarioRoutes/funcionarioRoutes'));
app.use("/api/aprendiz", require('./Routes/AprendizRoutes/aprendizRoutes'));
app.use("/api/administrador", require('./Routes/AdministradorRoutes/administradorRoutes'))
app.use("/api/seguridad", require('./Routes/Seguridad/seguridadRoutes'))
app.use("/api/ingresoDia", require('./Routes/IngresoRoutes/ingresoDiaRoutes'))
app.use("/api/salidaDia", require('./Routes/SalidaRoutes/salidaDiaRoutes'))
app.use("/api/estado", require('./Routes/Estado/estadoRoutes'))
app.use("/api/estadoAprendiz", require('./Routes/AprendizRoutes/estadoAprendizRoutes'))
app.use("/api/estadoFuncionario", require('./Routes/FuncionarioRoutes/estadoFuncionarioRoutes'))
app.use("/api/estadoVisitante", require('./Routes/VisitantesRoutes/estadoVisitanteRoutes'))
app.use("/api/noIngresoDia", require('./Routes/IngresoRoutes/noIngresoDiaRoutes'))
app.use("/api/saludEstado", require('./Routes/Estado/EstadoSaludRoutes'))
app.use("/api/reporteSaludDia", require('./Routes/ReportesRoutes/reporteSaludDiaRoutes'))
app.use("/api/reporteSalud", require('./Routes/ReportesRoutes/reporteSaludRoutes'))
app.use("/api/reporteInsumo", require('./Routes/ReportesRoutes/repInsumoRoutes'))
app.use("/api/reporteLimpieza", require('./Routes/ReportesRoutes/repLimpiezaRoutes'))
app.use("/api/ingresoSuspendido", require('./Routes/IngresoRoutes/ingresoSuspendidoRoutes'))
app.use("/api/soporte", require('./Routes/SoporteRoutes/soporteRoute'))
app.use("/api/habilitar", require('./Routes/HabilitarUsuarios/habilitarRoutes'))
app.use("/api/csv", require('./Routes/ExportarRoutes/exportarRoutes'))


// Run the server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
