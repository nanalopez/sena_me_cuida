import React, {useEffect} from 'react';
import './estilos.css';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import {Form, Container, Row, Col, Button} from 'react-bootstrap'
import Axios from 'axios'
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';


// import { Input } from '../../common/Inputs';
import {ButtonIcon} from '../../../Components/common/Button';


const Funcionario = () => {

    const [documentoIdentidad, setDocumentoIdentidad] = React.useState('')
    const [temperatura, setTemperatura] = React.useState('')
    const [cTemperatura, setCTemperatura] = React.useState(true)
    const [cDocumento, setCDocumento] = React.useState(false)
    const [dataState, setDataState] = React.useState({})

    function prevent() {
        document.querySelector("#documentoIdentidad").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        var NID = document.querySelector('#documentoIdentidad');
        NID.addEventListener('input', function () {
            if (this.value.length > 10)
                this.value = this.value.slice(0, 10);
        })
        document.querySelector("#temperatura").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 && evt.which !== 46 && evt.which !== 44 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        var NID = document.querySelector('#temperatura');
        NID.addEventListener('input', function () {
            if (this.value.length > 4)
                this.value = this.value.slice(0, 4);
        })
    }

    useEffect(() => {

        const callSearchService = () => {
            //   Api.search(value)
            //     .then(
            //       results => setResults(results),
            //       error => console.log(error)
            //     )
            console.log(documentoIdentidad);

            if (documentoIdentidad !== '') {
                humbral()
            }
        }

        let consultarAPI = setTimeout(() => {
            callSearchService();
        }, 3000);

        // Se dispara cada vez que se re-renderiza el componente
        return () => {
            clearTimeout(consultarAPI);
        }
    }, [documentoIdentidad]);

    useEffect(() => {

        const callSearchService = () => {
            //   Api.search(value)
            //     .then(
            //       results => setResults(results),
            //       error => console.log(error)
            //     )
            console.log(documentoIdentidad);

            if (temperatura < 38) {
                if (temperatura.length === 4) {
                    registroConTemperatura()
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡ALERTA!',
                    text: "¡NO SE PUEDE INGRESAR POR SU TEMPERATURA!",
                    timer: 10500
                })
                setCDocumento(true)
                setCTemperatura(true)
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            }
        }

        let consultarAPI = setTimeout(() => {
            callSearchService();
        }, 3000);

        // Se dispara cada vez que se re-renderiza el componente
        return () => {
            clearTimeout(consultarAPI);
        }
    }, [temperatura]);


    const handleDocumentoIdentidadChange = (event) => setDocumentoIdentidad(event.target.value)
    const handleTemperaturaChange = (event) => setTemperatura(event.target.value)

    async function humbral() {
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

        var deAlta = (ssi + ssi1 + ssi2);
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
        var sumaR = (si + si1 + si2)
        // var deBaja = ((si+si1+si2)-si3);
        var porcentajeA = ((si3 * 100) / sumaR)
        var restaR = (sumaR - si3)
        var porcentajeB = ((restaR * 100) / sumaR)
        localStorage.setItem('prcAlta', Math.round(porcentajeA))
        localStorage.setItem('prcBaja', Math.round(porcentajeB))
        localStorage.setItem('TotalR', sumaR)

        if (localStorage.getItem('prcAlta') <= 35) {
            registro()
        } else {
            Swal.fire({
                icon: 'warning',
                title: '¡ALERTA!',
                text: "¡NO SE PUEDE INGRESAR MAS PERSONAS, SE HA SUPERADO EL HUMBRAL!",
                timer: 10500
            })
            setCDocumento(true)
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        }
    }

    async function registro() {
        await fetch(`${process.env.REACT_APP_API_URL}/api/funcionario/ingreso`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({documentoIdentidad})
        })
            .then(function (result) {
                if (result['ok'] === true) {
                    result.text().then(function (data) {
                        console.log(data);
                        setDataState(data);
                    })
                    fetch(`${process.env.REACT_APP_API_URL}/api/reporteSaludDia/ing`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({documentoIdentidad})
                    })
                        .then(function (result) {
                            if (result['ok'] === true) {
                                fetch(`${process.env.REACT_APP_API_URL}/api/ingresoSuspendido/ing`, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({documentoIdentidad})
                                })
                                    .then(function (result) {
                                        if (result['ok'] === true) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: '¡INGRESASTE MAS DE 3 SINTOMAS EN EL REPORTE DE SALUD!',
                                                text: "Debes ponerte en contacto con el medico SENA",
                                                timer: 10500
                                            })
                                            setCDocumento(true)
                                            setCTemperatura(true)
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 3000);
                                        } else {
                                            result.text().then(function (data) {
                                                // console.log(data);
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: '¡USUARIO ENCONTRADO!',
                                                    text: "AHORA DIGITA LA TEMPERATURA",
                                                    timer: 10500
                                                })

                                            })
                                        }
                                    })
                                setCTemperatura(false)
                            } else {
                                result.text().then(function (data) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡ERROR!',
                                        text: '¡NO HA LLENADO EL CUESTIONARIO DE LOS SINTOMAS!',
                                        timer: 10500
                                    })
                                })
                            }
                        })
                } else {
                    result.text().then(function (data) {
                        Swal.fire({
                            icon: 'error',
                            title: '¡ERROR!',
                            text: data,
                            timer: 10500
                        })
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    })
                }
            })
    }


    async function registroConTemperatura() {


        let data = JSON.parse(dataState);
        const temp = {"temperatura": temperatura};

        data = {...data, ...temp};

        console.log(data);

        await fetch(`${process.env.REACT_APP_API_URL}/api/estadoFuncionario/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }).then(function (result) {
            if (result['ok'] === false) {
                Swal.fire({
                    icon: 'warning',
                    title: '¡ALERTA!',
                    text: JSON.stringify('¡ESTE USUARIO YA SE ENCUENTRA DE ALTA EN EL APLICATIVO!'),
                    timer: 10500
                })
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

            } else {
                Swal.fire({
                    icon: 'success',
                    title: '¡BIEN!',
                    text: JSON.stringify(`Bienvenido ${data.nombre} con EPS ${data.eps}`),
                    timer: 10500
                })
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        })
            .catch(function (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    timer: 1500
                })
            });
    }


    return (
        <div className='containerForm'>
            <TextField
                value={documentoIdentidad}
                onChange={handleDocumentoIdentidadChange}
                onKeyDown={prevent}
                required
                name="documentoIdentidad"
                id='documentoIdentidad'
                type='number'
                label='Documento de Identidad'
                placeholder='Ingresa el documento de identidad'
                variant='outlined'
                disabled={cDocumento}
            />
            <TextField
                value={temperatura}
                onChange={handleTemperaturaChange}
                onKeyDown={prevent}
                required
                name="temperatura"
                id='temperatura'
                type='number'
                label='Temperatura'
                placeholder='Ingresa la temperatura'
                variant='outlined'
                disabled={cTemperatura}
            />
            {/* <div>
                <div className="card-body">
                    <Container>
                        <h3>¿Presenta algunos de estos síntomas?</h3>
                        <hr/>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Label>
                                        <strong>Fiebre?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setFiebre(e.target.value = true)}
                                                value={fiebre} name={'fiebre'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setFiebre(e.target.value = false)}
                                                value={fiebre} name={'fiebre'} label={'No'}/>
                                </Col>
                                <Col>
                                    <Form.Label>
                                        <strong>Tos?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setTos(e.target.value = true)}
                                                value={Tos} name={'Tos'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setTos(e.target.value = false)}
                                                value={Tos} name={'Tos'} label={'No'}/>
                                </Col>
                                <Col>
                                    <Form.Label>
                                        <strong>Dolor al tragar?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setDolorTragar(e.target.value = true)}
                                                value={dolorTragar} name={'dolorTragar'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setDolorTragar(e.target.value = false)}
                                                value={dolorTragar} name={'dolorTragar'} label={'No'}/>
                                </Col>
                            </Row>

                            <hr/>

                            <Row>
                                <Col>
                                    <Form.Label>
                                        <strong>Malestar general?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setMalestarGeneral(e.target.value = true)}
                                                value={malestargeneral} name={'malestargeneral'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setMalestarGeneral(e.target.value = false)}
                                                value={malestargeneral} name={'malestargeneral'} label={'No'}/>
                                </Col>
                                <Col>
                                    <Form.Label>
                                        <strong>Dificultad para respirar?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio"
                                                onChange={e => setDificultadRespirar(e.target.value = true)}
                                                value={dificultadRespirar} name={'dificultadRespirar'} label={'Si'}/>
                                    <Form.Check type="radio"
                                                onChange={e => setDificultadRespirar(e.target.value = false)}
                                                value={dificultadRespirar} name={'dificultadRespirar'} label={'No'}/>

                                </Col>
                                <Col>
                                    <Form.Label>
                                        <strong>Gripa?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setGripa(e.target.value = true)}
                                                value={gripa} name={'gripa'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setGripa(e.target.value = false)}
                                                value={gripa} name={'gripa'} label={'No'}/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col>
                                    <Form.Label>
                                        <strong>Diarrea?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setDiarrea(e.target.value = true)}
                                                value={diarrea} name={'diarrea'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setDiarrea(e.target.value = false)}
                                                value={diarrea} name={'diarrea'} label={'No'}/>
                                </Col>
                                <Col>
                                    <Form.Label>
                                        <strong>A tenido contacto con casos sospechosos o confirmados?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setContacto(e.target.value = true)}
                                                value={contacto} name={'contacto'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setContacto(e.target.value = false)}
                                                value={contacto} name={'contacto'} label={'No'}/>

                                </Col>
                                <Col>
                                    <Form.Label>
                                        <strong>Dolor articular - Sensacion de cansancio?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setTratamiento(e.target.value = true)}
                                                value={tratamiento} name={'tratamiento'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setTratamiento(e.target.value = false)}
                                                value={tratamiento} name={'tratamiento'} label={'No'}/>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={{span: 10, offset: 1}}>
                                    <Button
                                        variant="outline-secondary"
                                        size="lg" block
                                        type="submit">
                                        Verificar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            </div> */}

            <div style={{marginTop: 25}}>
                <ButtonIcon
                    bgColor='#00A7AF'
                    title='Validar'
                    onClick={() => registro()}
                />
            </div>
        </div>
    )
}

export default Funcionario;
