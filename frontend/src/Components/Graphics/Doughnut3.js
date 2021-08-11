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
        const resM1 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countInstructor`)
        localStorage.setItem('estadoIfuncionario', resM1.data.result)
        
        
        const resM2 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countAdministrativo`)
        localStorage.setItem('estadoAfuncionario', resM2.data.result)
        
        const resM3 = await Axios.get(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countPersonalApoyo`)
        localStorage.setItem('estadoPAfuncionario', resM3.data.result)

        // var funcI = localStorage.getItem('estadoIfuncionario')
        // var funcA = localStorage.getItem('estadoAfuncionario')
        // var funcPA = localStorage.getItem('estadoPAfuncionario')
        // var si = parseInt(funcM)
        // var si1 = parseInt(visM)
        // var si2 = parseInt(aprnM)
        // var totalM = (si+si1+si2)
        // localStorage.setItem('totalM', totalM)


    }

    

    arrayMeses=[`Numero personal administrativo de Alta: ${localStorage.getItem('estadoAfuncionario')}`, `Numero instructores de Alta: ${localStorage.getItem('estadoIfuncionario')}`, `Numero personal de apoyo de Alta: ${localStorage.getItem('estadoPAfuncionario')}`]
    arrayDatosxMes=[
        localStorage.getItem('estadoAfuncionario'),
        localStorage.getItem('estadoIfuncionario'),
        localStorage.getItem('estadoPAfuncionario')
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
                                    text:"Tipo de funcionarios de ALTA",
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
