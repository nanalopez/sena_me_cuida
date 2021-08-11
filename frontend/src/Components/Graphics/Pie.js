import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import { Pie} from 'react-chartjs-2'
import Card from '@material-ui/core/Card';
import Axios from 'axios'
import './estilos.css'

class Chart extends Component {
    state = {
        documents: []
    }       
    
    async componentDidMount(){
        const resA = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoAprendiz/countDocuments`)
        localStorage.setItem('personasActivasA', resA.data.result)

        
        const resB = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countDocuments`)
        localStorage.setItem('personasActivasF', resB.data.result)

        const resC = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoVisitante/countDocuments`)
        localStorage.setItem('personasActivasV', resC.data.result)

        var funcc = localStorage.getItem('personasActivasA')
        var viss = localStorage.getItem('personasActivasF')
        var aprnn = localStorage.getItem('personasActivasV')
        var ssi = parseInt(funcc)
        var ssi1 = parseInt(viss)
        var ssi2 = parseInt(aprnn)

        var deAlta = (ssi+ssi1+ssi2);
        localStorage.setItem('deAlta', deAlta)

        const res1 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/funcionario/countDocuments`)
        localStorage.setItem('funcionario', res1.data.result)
        
        
        const res2 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/visitante/countDocuments`)
        localStorage.setItem('visitante', res2.data.result)
        
        const res3 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/aprendiz/countDocuments`)
        localStorage.setItem('aprendiz', res3.data.result)

        
        var act = localStorage.getItem('deAlta')
        var func = localStorage.getItem('funcionario')
        var vis = localStorage.getItem('visitante')
        var aprn = localStorage.getItem('aprendiz')
        var si = parseInt(func)
        var si1 = parseInt(vis)
        var si2 = parseInt(aprn)
        var si3 = parseInt(act)
        var sumaR = (si+si1+si2)
        // var deBaja = ((si+si1+si2)-si3);
        var porcentajeA = ((si3*100)/sumaR)
        var restaR = (sumaR-si3)
        var porcentajeB = ((restaR*100)/sumaR)
        var debaja = (localStorage.getItem('numBaja') - localStorage.getItem('deAlta'))
        localStorage.setItem('prcAlta', Math.round(porcentajeA))
        localStorage.setItem('numBaja', Math.round(sumaR))
        localStorage.setItem('numBaja-alta', debaja)
        localStorage.setItem('prcBaja', Math.round(porcentajeB))
        localStorage.setItem('TotalR', sumaR) 
    }

    

    arrayMeses=[`Numero personas DE ALTA: ${localStorage.getItem('deAlta')}`, `Numero personas DE BAJA: ${localStorage.getItem('numBaja-alta')}`]
    arrayDatosxMes=[
        localStorage.getItem('deAlta'),
        localStorage.getItem('numBaja-alta')
    ]

    constructor(props) {
        super(props);

        this.state = { 
            chartData: {
                labels:this.arrayMeses,
                datasets:[
                    {
                        label:'Ingresos por Mes',
                        data:this.arrayDatosxMes,
                        backgroundColor: [
                        'rgba(204,209,209)',
                        'rgba(52,73,94)',
                        'rgba(249,231,159)',
                        ]
                    }]
            }
        }
    }

    render() { 
        return ( 
            <div className="chart">
                    <Col xs={11} sm={11} md={11} lg={11} >
                    <div className="site-card-border-less-wrapper" >
                        <Card style={{ width: '94%', marginLeft:75, marginTop:20 }}>
                        <Pie
                            data={this.state.chartData}
                            options={{
                                maintainAspectRatio: true,
                                title:{
                                    display:true,
                                    text:"Numero de Personas de ALTA y de BAJA",
                                }
                            }}>
                        </Pie>
                        </Card>
                    </div>                 
                    </Col>
            </div>
        );
    }
}
 
export default Chart;
