import React, { useEffect } from 'react';
import './estilos.css';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
import {Form, Container, Row, Col, Button} from 'react-bootstrap'
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';


// import { Input } from '../../common/Inputs';
import { ButtonIcon } from '../../../Components/common/Button';

const Aprendiz = () => {
    const [fiebre, setFiebre] = React.useState(false)
    const [dolorTragar, setDolorTragar] = React.useState(false)
    const [tos, setTos] = React.useState(false)
    const [dificultadRespirar, setDificultadRespirar] = React.useState(false)
    const [malestargeneral, setMalestarGeneral] = React.useState(false)
    const [gripa, setGripa] = React.useState(false)
    const [diarrea, setDiarrea] = React.useState(false)
    const [contacto, setContacto] = React.useState(false)
    const [tratamiento, setTratamiento] = React.useState(false)
    const [documentoIdentidad, setDocumentoIdentidad] = React.useState('')
    const [cTemperatura, setCTemperatura] = React.useState(true)
    const [dataState, setDataState] = React.useState({})
    const [boton, setBoton] = React.useState(true)

    const handleDocumentoIdentidadChange = (event) => setDocumentoIdentidad(event.target.value)

    const [modalSec, setModalSec] = React.useState(false);
    const OpenModalSec = () => setModalSec(true);

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
    }

    useEffect(() => {

        const callSearchService = () => {
        //   Api.search(value)
        //     .then(
        //       results => setResults(results),
        //       error => console.log(error)
        //     )
            console.log(documentoIdentidad);

            if (documentoIdentidad!== '') {
                registro()
            }
        }

        let consultarAPI = setTimeout(() => {
          callSearchService();
        }, 2500);

        // Se dispara cada vez que se re-renderiza el componente
        return () => {
          clearTimeout(consultarAPI);
        }
      }, [documentoIdentidad]);


      const handleSubmit = e => {
        e.preventDefault();
        let valores = [
            fiebre,
            dolorTragar,
            tos,
            dificultadRespirar,
            malestargeneral,
            gripa,
            diarrea,
            contacto,
            tratamiento,
        ]

        const sintomas = valores.reduce(
            (out, bool, index) => bool ? out.concat(index) : out,
            []
        )

        let Fiebre = document.getElementsByName('fiebre')
        let S_Fiebre = false
        for (let i = 0; i < Fiebre.length; i++) {
            if (Fiebre[i].checked) {
                S_Fiebre = true
                break;
            }
        }

        let Dolor = document.getElementsByName('dolorTragar')
        let S_Dolor = false
        for (let i = 0; i < Dolor.length; i++) {
            if (Dolor[i].checked) {
                S_Dolor = true
                break;
            }
        }

        let TOS = document.getElementsByName('tos')
        let S_TOS = false
        for (let i = 0; i < TOS.length; i++) {
            if (TOS[i].checked) {
                S_TOS = true
                break;
            }
        }

        let Difcultad = document.getElementsByName('dificultadRespirar')
        let S_Difcultad = false
        for (let i = 0; i < Difcultad.length; i++) {
            if (TOS[i].checked) {
                S_Difcultad = true
                break;
            }
        }

        let Malestar = document.getElementsByName('malestargeneral')
        let S_Malestar = false
        for (let i = 0; i < Malestar.length; i++) {
            if (Malestar[i].checked) {
                S_Malestar = true
                break;
            }
        }

        let Gripa = document.getElementsByName('gripa')
        let S_Gripa = false
        for (let i = 0; i < Gripa.length; i++) {
            if (Gripa[i].checked) {
                S_Gripa = true
                break;
            }
        }

        let Diarrea = document.getElementsByName('diarrea')
        let S_Diarrea = false
        for (let i = 0; i < Diarrea.length; i++) {
            if (Diarrea[i].checked) {
                S_Diarrea = true
                break;
            }
        }

        let Contacto = document.getElementsByName('contacto')
        let S_Contacto = false
        for (let i = 0; i < Contacto.length; i++) {
            if (Contacto[i].checked) {
                S_Contacto = true
                break;
            }
        }

        let Tratamiento = document.getElementsByName('tratamiento')
        let S_Tratamiento = false
        for (let i = 0; i < Tratamiento.length; i++) {
            if (Tratamiento[i].checked) {
                S_Tratamiento = true
                break;
            }
        }

        if (S_Fiebre && S_Dolor && S_TOS && S_Difcultad && S_Malestar && S_Gripa && S_Diarrea && S_Contacto && S_Tratamiento) {
            if (sintomas.length >= 3) {
                registroConSintomasNE(valores)

            } else {
                registroConSintomas(valores);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Vacio',
                text: '¡Debe seleccionar todos los síntomas!',
                timer: 10500
            })
            return false;
        }
    }

    async function registro(){
        await fetch(`${process.env.REACT_APP_API_URL}/api/aprendiz/ingreso`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({documentoIdentidad})
        })
        .then(function (result) {
            if (result['ok'] === true) {
                result.text().then(function(data) {
                    setDataState(data);
                    console.log(data);
                })
                .then(
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
                            title: '¡BLOQUEADO!',
                            text: '¡Debes contactar al medico SENA por el ultimo reporte que dice que tienes mas de 3 sintomas!',
                            timer: 10500
                        })
                        setBoton(true)
                    } else {
                        result.text().then(function(data) {
                            Swal.fire({
                                icon: 'success',
                                title: '¡APRENDIZ ENCONTRADO!',
                                text: "AHORA LLENA EL CUESTIONARIO",
                                timer: 10500
                            })
                            setBoton(false)
                        })
                    }
                    })
                )
            } else {
                result.text().then(function(data) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: data,
                        timer: 10500
                    })
                    setBoton(true)
                })
            }
            })
        }



    async function registroConSintomas(valores){
        let sintomass = valores
        const data = JSON.parse(dataState);
        const newData={
            ...data,
            sintomas: sintomass
        }

        console.log(newData);
        await fetch(`${process.env.REACT_APP_API_URL}/api/reporteSaludDia/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newData})
        })
        .then(function (result) {
            if (result['ok'] === true) {
                result.text().then(function(data) {
                    console.log(data);
                    var data1 = JSON.parse(data)
                    console.log(data1.data);
                    Swal.fire({
                    icon: 'success',
                    title: `¡GRACIAS POR ACTUALIZAR SUS SINTOMAS! ${data1.data.nombre}`,
                    text: `FECHA: ${moment().format('L')}, ${moment().format('LT')}`,
                    timer: 10500
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 10000);
                })
            } else {
                result.text().then(function(data) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: '¡Ya has llenado el questionario por el dia de hoy!',
                        timer: 10500
                    })
                })
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


    async function registroConSintomasNE(valores){
        let sintomass = valores
        const data = JSON.parse(dataState);
        const newData={
            ...data,
            sintomas: sintomass
        }

        await fetch(`${process.env.REACT_APP_API_URL}/api/reporteSaludDia/createNE`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newData})
        })
        .then(function (result) {
            if (result['ok'] === true) {
                result.text().then(function(data) {
                    var data1 = JSON.parse(data)
                    console.log(data1.data);
                    Swal.fire({
                    icon: 'success',
                    title: `¡GRACIAS POR ACTUALIZAR SUS SINTOMAS! ${data1.data.nombre}`,
                    text: `FECHA: ${moment().format('L')}, ${moment().format('LT')}`,
                    timer: 10500
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 10000);
                })
            } else {
                result.text().then(function(data) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: '¡Ya has llenado el questionario por el dia de hoy!',
                        timer: 10500
                    })
                })
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
            />
            <div>
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
                                                value={tos} name={'tos'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setTos(e.target.value = false)}
                                                value={tos} name={'tos'} label={'No'}/>
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
                                        <strong>Ha tenido contacto con casos sospechosos o confirmados?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setContacto(e.target.value = true)}
                                                value={contacto} name={'contacto'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setContacto(e.target.value = false)}
                                                value={contacto} name={'contacto'} label={'No'}/>

                                </Col>
                                <Col>
                                    <Form.Label>
                                        <strong>Dolor de Cabeza?</strong>
                                    </Form.Label>
                                    <Form.Check type="radio" onChange={e => setTratamiento(e.target.value = true)}
                                                value={tratamiento} name={'tratamiento'} label={'Si'}/>
                                    <Form.Check type="radio" onChange={e => setTratamiento(e.target.value = false)}
                                                value={tratamiento} name={'tratamiento'} label={'No'}/>
                                </Col>
                            </Row>
                            <hr/>
                                <div style={{marginTop: 25, marginLeft: "43%"}}>
                                    {/* <ButtonIcon
                                        bgColor='#00A7AF'
                                        title='Siguiente'
                                        onClick={() => OpenModalSec()}
                                        disabled={true}
                                    /> */}
                                    <Button
                                        style={{
                                            backgroundColor:"#00A7AF",
                                            borderColor:"#00A7AF"
                                        }}
                                        type="submit"
                                        disabled={boton}
                                        onClick={() => OpenModalSec()}
                                    >
                                        REGISTRAR
                                    </Button>
                                </div>
                        </Form>
                    </Container>
                </div>
            </div>
            {/* <div style={{marginTop:25}}>
            <ButtonIcon
                bgColor='#00A7AF'
                title='Validar'
                onClick={() => registro()}
            />
            </div> */}
        </div>
    )
}

export default Aprendiz;
