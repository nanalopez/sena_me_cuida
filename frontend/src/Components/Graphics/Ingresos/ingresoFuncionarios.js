import React, {Component} from 'react'
import {Col} from 'react-flexbox-grid';
import {Line} from 'react-chartjs-2'
import Card from '@material-ui/core/Card';

class IngresoFuncionarios extends Component {

    state = {
        result: [],
        arrayMeses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        arrayDatosxMes: [],
        arrayF: [],
        arrayV: [],
    }


    async componentDidMount() {

        await fetch(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/countIngMeses`)
            .then(res => res.json())
            .then(data => {

                const array = data.ingreso

                const resultF = array.sort(((a, b) => a._id - b._id))

                const valF = []

                valF.push(resultF.map((key) => {
                    return (parseInt(key.total));
                }))

                this.setState({arrayF: valF[0]})

            })


    }

    _renderCurrencies() {

        return (
            <Line
                data={this.state.chartData = {
                    labels: this.state.arrayMeses,
                    datasets: [
                        {
                            label: 'Funcionarios ingresos por Mes',
                            data: this.state.arrayF,
                            backgroundColor: [
                                'rgba(0, 97, 100, 1)'
                            ]
                        }]
                }}
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: "Estadísticas de ingreso de funcionarios por mes",
                    }
                }}>

            </Line>
        )
    }


    render() {


        return (
            <div className="chart">
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className="site-card-border-less-wrapper">
                        <Card style={{width: '92%', marginLeft: 60, marginTop: 20}}>
                            {this._renderCurrencies()}
                        </Card>
                    </div>
                </Col>
            </div>
        )
    }
}


export default IngresoFuncionarios
