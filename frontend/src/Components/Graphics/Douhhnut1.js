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

        const res1 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countDocuments`)
        localStorage.setItem('estadofuncionario', res1.data.result)
        
        
        const res2 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoVisitante/countDocuments`)
        localStorage.setItem('estadovisitante', res2.data.result)
        
        const res3 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoAprendiz/countDocuments`)
        localStorage.setItem('estadosaprendiz', res3.data.result)

        
        var func = localStorage.getItem('estadofuncionario')
        var vis = localStorage.getItem('estadovisitante')
        var aprn = localStorage.getItem('estadosaprendiz')
        var reg = localStorage.getItem('TotalR')
        var si = parseInt(func)
        var si1 = parseInt(vis)
        var si2 = parseInt(aprn)
        var si3 = parseInt(reg)

        var porcentajeA = ((si2*100)/si3);
        var porcentajeV = ((si1*100)/si3);
        var porcentajeF = ((si*100)/si3);

        localStorage.setItem('poringA', Math.round(porcentajeA)) 
        localStorage.setItem('poringV', Math.round(porcentajeV)) 
        localStorage.setItem('poringF', Math.round(porcentajeF)) 
        localStorage.setItem('funAct', si) 
        localStorage.setItem('AprendAct', si2) 
        localStorage.setItem('visitAct', si1) 
    }

    

    arrayMeses=[`Numero funcionarios de Alta: ${localStorage.getItem('funAct')}`, `Numero aprendices de Alta: ${localStorage.getItem('AprendAct')}`, `Numero visitantes de Alta: ${localStorage.getItem('visitAct')}`]
    arrayDatosxMes=[
        localStorage.getItem('funAct'),
        localStorage.getItem('AprendAct'), 
        localStorage.getItem('visitAct') 

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
                                    text:"Numero Personas de ALTA",
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
