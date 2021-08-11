//Libs
const convertir = require('json-2-csv')
const fs = require('fs')
//models
const Aprendiz = require('../../Models/Aprendiz/tbl_aprendiz')
const Vistante = require('../../Models/Visitante/tbl_visitante')
const Funcionario = require('../../Models/Funcionario/tbl_funcionario')
const EstadoAprendiz = require('../../Models/Aprendiz/tbl_estadoAprendiz')
const EstadoVistante = require('../../Models/Visitante/tbl_estadoVisitante')
const EstadoFuncionario = require('../../Models/Funcionario/tbl_estadoFuncionario')
const ReporteInsumos = require('../../Models/Reporte/tbl_RepInsumos')
const ReporteLimpieza = require('../../Models/Reporte/tbl_RepLimpieza')
const ReporteSalud = require('../../Models/Reporte/tbl_reporteSalud')
const ReporteSaludDia = require('../../Models/Reporte/tbl_reporteSaludDia')
const SalidaDias = require('../../Models/Salida/tbl_salidaDia')
const UsuarioSuspendido = require('../../Models/Ingreso/tbl_ingresoSuspendido')


let Fecha = new Date()
let ParseDate = `${Fecha.getDate()}-${Fecha.getMonth() + 1}-${Fecha.getFullYear()}`

exports.ListarTablas = async (req, res) => {

    try {
        //Consultas multiples
        const Consulta = await Promise.all([

            //Usuarios
            Vistante.find(),
            Aprendiz.find(),
            Funcionario.find(),
            //Estados
            EstadoVistante.find(),
            EstadoAprendiz.find(),
            EstadoFuncionario.find(),
            //Reportes
            ReporteInsumos.find(),
            ReporteLimpieza.find(),
            ReporteSalud.find(),
            ReporteSaludDia.find(),
            //Ingresos
            SalidaDias.find(),
            UsuarioSuspendido.find(),

        ])

        res.send({data: Consulta})

    } catch (e) {
        res.status(500).json({error: e})
    }

}

exports.Exportar_tablas = async (req, res) => {

    const {body: {data}} = req

    //Usuarios
    const visitante = data[0]
    const aprendiz = data[1]
    const funcionario = data[2]


    //Estados
    const EstadoVistante = data[3]
    const EstadoAprendiz = data[4]
    const EstadoFuncionario = data[5]
    //Reportes
    const ReporteInsumos = data[6]
    const ReporteLimpieza = data[7]
    const ReporteSalud = data[8]
    const ReporteSaludDia = data[9]
    //Ingresos
    const SalidaDias = data[10]
    const UsuarioSuspendido = data[11]


    try {
        //Usuarios
        const TablaVisitante = await convertir.json2csvAsync(visitante)
        const TablaAprendiz = await convertir.json2csvAsync(aprendiz)
        const TablaFuncionario = await convertir.json2csvAsync(funcionario)
        //Estados
        const TablaEstadoVisitante = await convertir.json2csvAsync(EstadoVistante)
        const TablaEstadoAprendiz = await convertir.json2csvAsync(EstadoAprendiz)
        const TablaEstadoFuncionario = await convertir.json2csvAsync(EstadoFuncionario)
        //Reportes
        const TablaReporteInsumos = await convertir.json2csvAsync(ReporteInsumos)
        const TablaReporteLimpieza = await convertir.json2csvAsync(ReporteLimpieza)
        const TablaReporteSalud = await convertir.json2csvAsync(ReporteSalud)
        const TablaReporteSaludDia = await convertir.json2csvAsync(ReporteSaludDia)
        //Ingresos
        const TablaSalidaDias = await convertir.json2csvAsync(SalidaDias)
        const TablaUsuarioSuspendido = await convertir.json2csvAsync(UsuarioSuspendido)

        //Usuarios
        fs.writeFileSync(`exports/TablaVisitante-${ParseDate}.csv`, TablaVisitante);
        fs.writeFileSync(`exports/TablaAprendiz-${ParseDate}.csv`, TablaAprendiz);
        fs.writeFileSync(`exports/TablaFuncionario-${ParseDate}.csv`, TablaFuncionario);
        //Estados
        fs.writeFileSync(`exports/TablaEstadoVisitante-${ParseDate}.csv`, TablaEstadoVisitante);
        fs.writeFileSync(`exports/TablaEstadoAprendiz-${ParseDate}.csv`, TablaEstadoAprendiz);
        fs.writeFileSync(`exports/TablaEstadoFuncionario-${ParseDate}.csv`, TablaEstadoFuncionario);
        //Reportes
        fs.writeFileSync(`exports/TablaReporteInsumos-${ParseDate}.csv`, TablaReporteInsumos);
        fs.writeFileSync(`exports/TablaReporteLimpieza-${ParseDate}.csv`, TablaReporteLimpieza);
        fs.writeFileSync(`exports/TablaReporteSalud-${ParseDate}.csv`, TablaReporteSalud);
        fs.writeFileSync(`exports/TablaReporteSaludDia-${ParseDate}.csv`, TablaReporteSaludDia);
        //Ingresos
        fs.writeFileSync(`exports/TablaSalidaDias-${ParseDate}.csv`, TablaSalidaDias);
        fs.writeFileSync(`exports/TablaUsuarioSuspendido-${ParseDate}.csv`, TablaUsuarioSuspendido);


        res.json({success: 'exportado'})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e})
    }


}
