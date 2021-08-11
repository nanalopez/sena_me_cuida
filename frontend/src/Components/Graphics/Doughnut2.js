import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import { Doughnut } from 'react-chartjs-2'
import Card from '@material-ui/core/Card';
import Axios from 'axios'
import './estilos.css'

class Chart extends Component {
    state = {
        documents: []
    }       
    
    async componentDidMount(){

        // ------- GENERO MASCULINO ---------
        const resM1 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countMasc`)
        localStorage.setItem('estadoMfuncionario', resM1.data.result)
        
        
        const resM2 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoVisitante/countMasc`)
        localStorage.setItem('estadoMvisitante', resM2.data.result)
        
        const resM3 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoAprendiz/countMasc`)
        localStorage.setItem('estadoMaprendiz', resM3.data.result)

        var funcM = localStorage.getItem('estadoMfuncionario')
        var visM = localStorage.getItem('estadoMvisitante')
        var aprnM = localStorage.getItem('estadoMaprendiz')
        var si = parseInt(funcM)
        var si1 = parseInt(visM)
        var si2 = parseInt(aprnM)
        var totalM = (si+si1+si2)
        localStorage.setItem('totalM', totalM)



        // ------- GENERO FEMENINO ---------
        const resF1 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countFem`)
        localStorage.setItem('estadoFfuncionario', resF1.data.result)
    
        
        const resF2 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoVisitante/countFem`)
        localStorage.setItem('estadoFvisitante', resF2.data.result)
        
        const resF3 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoAprendiz/countFem`)
        localStorage.setItem('estadoFaprendiz', resF3.data.result)
        
        var funcF = localStorage.getItem('estadoFfuncionario')
        var visF = localStorage.getItem('estadoFvisitante')
        var aprnF = localStorage.getItem('estadoFaprendiz')
        var si = parseInt(funcF)
        var si1 = parseInt(visF)
        var si2 = parseInt(aprnF)
        var totalF = (si+si1+si2)
        localStorage.setItem('totalF', totalF)


    }

    

    arrayMeses=[`Numero mujeres de Alta: ${localStorage.getItem('totalF')}`, `Numero hombres de Alta: ${localStorage.getItem('totalM')}`]
    arrayDatosxMes=[
        localStorage.getItem('totalF'),
        localStorage.getItem('totalM'), 
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
                        <Card style={{ width: '94%', marginLeft:70, marginTop:20 }}>
                        <Doughnut 
                            data={this.state.chartData}
                            options={{
                                maintainAspectRatio: true,
                                title:{
                                    display:true,
                                    text:"Numero Personas * genero de ALTA",
                                }
                            }}>
                        </Doughnut>
                        </Card>
                    </div>                 
                    </Col>
            </div>
        );
    }
}
 
export default Chart;
