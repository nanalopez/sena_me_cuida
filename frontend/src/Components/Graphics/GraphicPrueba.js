import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import {Typography} from '@material-ui/core'
import { HorizontalBar} from 'react-chartjs-2'
import { Card } from 'antd';
import Axios from 'axios'

class Chart extends Component {

    arrayMeses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    arrayDatosxMes=[
        4,
        3,
        7,
        2,
        4,
        6,
        10,
        5,
        9,
        4,
        5,
        12
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
                        'rgba(204,209,209)',
                        'rgba(52,73,94)',
                        'rgba(249,231,159)',
                        'rgba(204,209,209)',
                        'rgba(52,73,94)',
                        'rgba(249,231,159)',
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
                    <Col xs={12} sm={12} md={12} lg={12} >
                    <div className="site-card-border-less-wrapper" alignSelf="center" >
                        <Card bordered={false} alignSelf="center" style={{ width: '94%', marginLeft:70, marginTop:20 }}>
                        <HorizontalBar
                            data={this.state.chartData}
                            options={{
                                maintainAspectRatio: true
                            }}>
                        </HorizontalBar>
                        </Card>
                    </div>                    
                    </Col>
            </div>
        );
    }
}
 
export default Chart;
