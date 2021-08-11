import React, {Component} from 'react'
import {Col} from 'react-flexbox-grid';
import {Line} from 'react-chartjs-2'
import Card from '@material-ui/core/Card';

class Line3 extends Component {

    state = {
        result: [],
        arrayMeses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        arrayDatosxMes: [],
        arrayF: [],
        arrayV: [],
        arrayA: []
    }


    async componentDidMount() {
        // await fetch(`${process.env.REACT_APP_API_URL}/api/funcionario/countMeses`)
        // .then(res => res.json())
        // .then( data => {

        //     const array = data.result
        //     this.setState({result : array.sort(((a,b) => a._id - b._id))})

        //     const val = []
        //     const val2 = []
        //     const val3 = []
        //     const res = val[0]+val2[0]+val3[0]

        //     val.push(this.state.result.map( (key) => {
        //         return (parseInt (key.total));
        //     }))
        //     this.setState({arrayDatosxMes: val[0]})

        // })

        await fetch(`${process.env.REACT_APP_API_URL}/api/funcionario/countMeses`)
            .then(res => res.json())
            .then(data => {

                const array = data.result

                const resultF = array.sort(((a, b) => a._id - b._id))

                // console.log(resultF, "FUNCIONARIO");
                const valF = []

                valF.push(resultF.map((key) => {
                    return (parseInt(key.total));
                }))

                this.setState({arrayF: valF[0]})

            })

        await fetch(`${process.env.REACT_APP_API_URL}/api/visitante/countMeses`)
            .then(res => res.json())
            .then(data => {

                const array = data.result
                const resultF = array.sort(((a, b) => a._id - b._id))
                // console.log(resultF, "VISITANTE");
                const valV = []

                valV.push(resultF.map((key) => {
                    return (parseInt(key.total));
                }))
                this.setState({arrayV: valV[0]})

            })

        await fetch(`${process.env.REACT_APP_API_URL}/api/aprendiz/countMeses`)
            .then(res => res.json())
            .then(data => {

                const array = data.result
                const resultF = array.sort(((a, b) => a._id - b._id))
                const valA = []

                valA.push(resultF.map((key) => {
                    return (parseInt(key.total));
                }))
                this.setState({arrayA: valA[0]})
            })

    }

    _renderCurrencies() {

        var result = this.state.arrayV.map((item, ix) => item + this.state.arrayA[ix] + this.state.arrayF[ix]);

        return (
            <Line
                data={this.state.chartData = {
                    labels: this.state.arrayMeses,
                    datasets: [
                        {
                            label: 'Registros por Mes',
                            data: result,
                            backgroundColor: [
                                'rgba(0, 97, 100, 1)'
                            ]
                        }]
                }}
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: "Estadísticas de registro de personas por Mes",
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


export default Line3
