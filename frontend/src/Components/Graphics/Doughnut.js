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

        const res1 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/funcionario/countDocuments`)
        localStorage.setItem('funcionario', res1.data.result)
        
        
        const res2 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/visitante/countDocuments`)
        localStorage.setItem('visitante', res2.data.result)
        
        const res3 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/aprendiz/countDocuments`)
        localStorage.setItem('aprendiz', res3.data.result)

        
        var func = localStorage.getItem('funcionario')
        var vis = localStorage.getItem('visitante')
        var aprn = localStorage.getItem('aprendiz')
        var si = parseInt(func)
        var si1 = parseInt(vis)
        var si2 = parseInt(aprn)
        var deBaja = ((si+si1+si2));
        localStorage.setItem('deBaja', deBaja) 
    }

    

    arrayMeses=[`Funcionarios: ${localStorage.getItem('funcionario')}`, `Visitantes: ${localStorage.getItem('visitante')}`, `Aprendices: ${localStorage.getItem('aprendiz')}`]
    arrayDatosxMes=[
        localStorage.getItem('funcionario'),
        localStorage.getItem('visitante'),
        localStorage.getItem('aprendiz'),

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
                    }],
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
                                    text:"Numero de personas Registradas",
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
