import React from 'react';
import './estilos.css';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Modal} from 'react-bootstrap';
import {Title} from '../../Components/common/Texts';
import {Form, Container, Row, Col, Button} from 'react-bootstrap'
import ReCAPTCHA from "react-google-recaptcha";

// import { Input } from '../common/Inputs';
import {ButtonIcon} from '../../Components/common/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Visitante = () => {

    const classes = useStyles();
    const recaptchaRef = React.createRef();
    const [nombre, setNombre] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [documentoIdentidad, setDocumentoIdentidad] = React.useState('')
    const [celular, setCelular] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [direccionResidencia, setDireccionResidencia] = React.useState('')
    const [eps, setEps] = React.useState('')
    const [fiebre, setFiebre] = React.useState(false)
    const [dolorTragar, setDolorTragar] = React.useState(false)
    const [Tos, setTos] = React.useState(false)
    const [dificultadRespirar, setDificultadRespirar] = React.useState(false)
    const [malestargeneral, setMalestarGeneral] = React.useState(false)
    const [gripa, setGripa] = React.useState(false)
    const [diarrea, setDiarrea] = React.useState(false)
    const [contacto, setContacto] = React.useState(false)
    const [tratamiento, setTratamiento] = React.useState(false)
    const [torre, setTorre] = React.useState("")
    const [piso, setPiso] = React.useState("")
    const [sexo, setSexo] = React.useState("")
    const [transporte, setTransporte] = React.useState("")
    const [cargo, setCargo] = React.useState("")


    const handleNombreChange = (event) => setNombre(event.target.value)
    const handleEmailChange = (event) => setEmail(event.target.value)
    const handleDocumentoIdentidadChange = (event) => setDocumentoIdentidad(event.target.value)
    const handleCelularChange = (event) => setCelular(event.target.value)
    const handleTelefonoChange = (event) => setTelefono(event.target.value)
    const handleDireccionResidenciaChange = (event) => setDireccionResidencia(event.target.value)
    const handleEpsChange = (event) => setEps(event.target.value)
    const handleTorreChange = (event) => setTorre(event.target.value)
    const handlePisoChange = (event) => setPiso(event.target.value)
    const handleSexoChange = (event) => setSexo(event.target.value)
    const handleTransporteChange = (event) => setTransporte(event.target.value)
    const handleCargoChange = (event) => setCargo(event.target.value)

    //Segundo modal
    const [modalSec, setModalSec] = React.useState(false);
    const OpenModalSec = () => setModalSec(true);

    function prevent() {
        document.querySelector("#numeroId").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        document.querySelector("#tel1").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        document.querySelector("#celular").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        document.querySelector("#nombre").addEventListener("keypress", function (evt) {
            if (!(evt.which >= 65 && evt.which <= 122) && (evt.which !== 32 && evt.which !== 0) && !(evt.which === 241)) {
                evt.preventDefault();
            }
        });
        var NID = document.querySelector('#numeroId');
        NID.addEventListener('input', function () {
            if (this.value.length > 10)
                this.value = this.value.slice(0, 10);
        })
        var NTEL = document.querySelector('#tel1');
        NTEL.addEventListener('input', function () {
            if (this.value.length > 10)
                this.value = this.value.slice(0, 10);
        })
        var NTELF = document.querySelector('#celular');
        NTELF.addEventListener('input', function () {
            if (this.value.length > 10)
                this.value = this.value.slice(0, 10);
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        //trae el valor que genera el recaptcha
        const seleccionado = recaptchaRef.current.getValue()
        let valores = [
            fiebre,
            dolorTragar,
            Tos,
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

        let TOS = document.getElementsByName('Tos')
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


        if (seleccionado) {
            if (S_Fiebre && S_Dolor && S_TOS && S_Difcultad && S_Malestar && S_Gripa && S_Diarrea && S_Contacto && S_Tratamiento) {
                if (sintomas.length >= 3) {
                    registroNE(valores)
                } else {
                    registroE(valores)
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Vacio',
                    text: '¡Debe seleccionar todos los síntomas!',
                    timer: 10500
                })
                return false
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Por favor verifique que no es un bot!",
                timer: 10500
            })
        }
    }

    async function registroNE(valores) {
        let sintomas = valores
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var address = document.querySelector('#correo').value;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var address = document.querySelector('#correo').value;
        var name = document.querySelector('#nombre').value;
        var ID = document.querySelector('#numeroId').value;
        var tel = document.querySelector('#tel1').value;
        var cel = document.querySelector('#celular').value;
        var direccion = document.querySelector('#direccion').value;
        if (reg.test(address) == false) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar una direccion de correo electronico valida!",
                timer: 10500
            })
            return (false);
        } else if (name.length < 8) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar tu nombre completo!",
                timer: 10500
            })
            return (false);
        } else if (ID.length < 5) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero de documento de identidad valido!",
                timer: 10500
            })
            return (false);
        } else if (tel.length < 7) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero de telefono valido!",
                timer: 10500
            })
            return (false);
        } else if (cel.length < 7) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar otro numero de telefono valido!",
                timer: 10500
            })
            return (false);
        } else if (direccion.length < 10) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar una dirección valida!",
                timer: 10500
            })
            return (false);
        } else {
            await fetch(`${process.env.REACT_APP_API_URL}/api/funcionario/createNE`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    nombre,
                    sexo,
                    cargo,
                    email,
                    documentoIdentidad,
                    celular,
                    telefono,
                    direccionResidencia,
                    eps,
                    torre,
                    piso,
                    transporte,
                    sintomas
                })
            })
                .then(function (result) {
                    if (result['ok'] === true) {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'warning',
                                title: '¡ALERTA!',
                                text: "¡SE HAS REGISTRADO CON EXITO, PERO NO PUEDE ENTRAR AL CENTRO POR SUS SINTOMAS!",
                                timer: 10500
                            })
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        })
                    } else if (result.status === 400) {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'error',
                                title: '¡DEBES LLENAR TODOS LOS CAMPOS!',
                                timer: 10500
                            })
                        })
                    } else {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'error',
                                title: '¡Este dato ya se encuentra registrado en el aplicativo!',
                                text: data,
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
    }


    async function registroE(valores) {
        let sintomas = valores
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var address = document.querySelector('#correo').value;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var address = document.querySelector('#correo').value;
        var name = document.querySelector('#nombre').value;
        var ID = document.querySelector('#numeroId').value;
        var tel = document.querySelector('#tel1').value;
        var cel = document.querySelector('#celular').value;
        var direccion = document.querySelector('#direccion').value;
        if (reg.test(address) == false) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar una direccion de correo electronico valida!",
                timer: 10500
            })
            return (false);
        } else if (name.length < 8) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar tu nombre completo!",
                timer: 10500
            })
            return (false);
        } else if (ID.length < 5) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero de documento de identidad valido!",
                timer: 10500
            })
            return (false);
        } else if (tel.length < 7) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero de telefono valido!",
                timer: 10500
            })
            return (false);
        } else if (cel.length < 7) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar otro numero de telefono valido!",
                timer: 10500
            })
            return (false);
        } else if (direccion.length < 10) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar una dirección valida!",
                timer: 10500
            })
            return (false);
        } else {
            await fetch(`${process.env.REACT_APP_API_URL}/api/funcionario/create`, {
            // await fetch(`${process.env.REACT_APP_API_URL}/api/funcionario/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    nombre,
                    sexo,
                    cargo,
                    email,
                    documentoIdentidad,
                    celular,
                    telefono,
                    direccionResidencia,
                    eps,
                    torre,
                    piso,
                    transporte,
                    sintomas
                })
            })
                .then(function (result) {
                    if (result['ok'] === true) {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'success',
                                title: '¡BIEN!',
                                text: data,
                                timer: 1500
                            })
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        })
                    } else if (result.status === 400) {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'error',
                                title: '¡DEBES LLENAR TODOS LOS CAMPOS!',
                                timer: 10500
                            })
                        })
                    } else {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'error',
                                title: '¡Este dato ya se encuentra registrado en el aplicativo!',
                                text: data,
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
    }

    return (
        <div className='containerForm'>
            <TextField
                value={nombre}
                onChange={handleNombreChange}
                onKeyDown={prevent}
                required
                fullWidth
                name="nombre"
                id='nombre'
                type='text'
                label='Nombre completo'
                placeholder='Ingresa tu nombre completo'
                variant="outlined"
            />
            <div style={{width: '100%', marginTop: '1%', marginLeft: '-2%'}}>
                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Genero</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="SEXO"
                        value={sexo}
                        onChange={handleSexoChange}
                    >
                        <MenuItem value={'Masculino'} onChange={handleSexoChange}>Masculino</MenuItem>
                        <MenuItem value={'Femenino'} onChange={handleSexoChange}>Femenino</MenuItem>
                        <MenuItem value={'Prefiero no decir'} onChange={handleSexoChange}>Prefiero no decir</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100%', marginLeft: '-2%'}}>
                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Tipo de cargo</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="CARGO"
                        value={cargo}
                        onChange={handleCargoChange}
                    >
                        <MenuItem value={'Instructor'} onChange={handleCargoChange}>Instructor</MenuItem>
                        <MenuItem value={'Administrativo'} onChange={handleCargoChange}>Administrativo</MenuItem>
                        <MenuItem value={'Personal de Vigilancia'} onChange={handleCargoChange}>Personal de
                            Vigilancia</MenuItem>
                        <MenuItem value={'Personal de Apoyo'} onChange={handleCargoChange}>Personal de Apoyo</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100%', marginTop: '1%'}}>
                <TextField
                    value={email}
                    onChange={handleEmailChange}
                    required
                    fullWidth
                    name="email"
                    id='correo'
                    type='email'
                    label='Correo electrónico'
                    placeholder='Ingresa tu correo'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={documentoIdentidad}
                    onChange={handleDocumentoIdentidadChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="documentoIdentidad"
                    id='numeroId'
                    type='number'
                    label='Número de documento'
                    placeholder='Ingresa tu número de documento'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={telefono}
                    onChange={handleTelefonoChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="telefono"
                    id='tel1'
                    type='number'
                    label='Número de teléfono'
                    placeholder='Ingresa tu número de teléfono'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={celular}
                    onChange={handleCelularChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="celular"
                    id='celular'
                    type='number'
                    label='Número de teléfono de un familiar'
                    placeholder='Ingresa número de teléfono'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={direccionResidencia}
                    onChange={handleDireccionResidenciaChange}
                    required
                    fullWidth
                    name="direccionResidencia"
                    id='direccion'
                    type='text'
                    label='Dirección'
                    placeholder='Ingresa tu dirección de residencia'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1%', marginLeft: '-2%'}}>
                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">EPS</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="EPS"
                        value={eps}
                        onChange={handleEpsChange}
                    >
                        <MenuItem value={'NINGUNA'} onChange={handleEpsChange}>NINGUNA</MenuItem>
                        <MenuItem value={'SURA'} onChange={handleEpsChange}>SURA</MenuItem>
                        <MenuItem value={'Coomeva'} onChange={handleEpsChange}>Coomeva</MenuItem>
                        <MenuItem value={'Salud Colmena'} onChange={handleEpsChange}>Salud Colmena</MenuItem>
                        <MenuItem value={'Salud total'} onChange={handleEpsChange}>Salud Total</MenuItem>
                        <MenuItem value={'Cafesalud'} onChange={handleEpsChange}>Cafesalud</MenuItem>
                        <MenuItem value={'Sanitas'} onChange={handleEpsChange}>Sanitas</MenuItem>
                        <MenuItem value={'Medimas'} onChange={handleEpsChange}>Medimas</MenuItem>
                        <MenuItem value={'Colseguros'} onChange={handleEpsChange}>Colseguros</MenuItem>
                        <MenuItem value={'Colpatria'} onChange={handleEpsChange}>Colpatria</MenuItem>
                        <MenuItem value={'Cruz blanca'} onChange={handleEpsChange}>Cruz Blanca</MenuItem>
                        <MenuItem value={'Sisben'} onChange={handleEpsChange}>Sisben</MenuItem>
                        <MenuItem value={'Sanidad Militar'} onChange={handleEpsChange}>Sanidad Militar</MenuItem>
                        <MenuItem value={'Red Vital'} onChange={handleEpsChange}>Red Vital</MenuItem>
                        <MenuItem value={'Nueva EPS'} onChange={handleEpsChange}>Nueva EPS</MenuItem>
                        <MenuItem value={'SaviaSalud'} onChange={handleEpsChange}>SaviaSalud</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100%', marginLeft: '-2%'}}>
                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">TORRE</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="EPS"
                        value={torre}
                        onChange={handleTorreChange}
                    >
                        <MenuItem value={'Torre Sur'} onChange={handleTorreChange}>Torre Sur</MenuItem>
                        <MenuItem value={'Torre Norte'} onChange={handleTorreChange}>Torre Norte</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100%', marginLeft: '-2%'}}>
                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Numero de Piso</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="EPS"
                        value={piso}
                        onChange={handlePisoChange}
                    >
                        <MenuItem value={'1'} onChange={handlePisoChange}>1</MenuItem>
                        <MenuItem value={'2'} onChange={handlePisoChange}>2</MenuItem>
                        <MenuItem value={'3'} onChange={handlePisoChange}>3</MenuItem>
                        <MenuItem value={'4'} onChange={handlePisoChange}>4</MenuItem>
                        <MenuItem value={'5'} onChange={handlePisoChange}>5</MenuItem>
                        <MenuItem value={'6'} onChange={handlePisoChange}>6</MenuItem>
                        <MenuItem value={'7'} onChange={handlePisoChange}>7</MenuItem>
                        <MenuItem value={'8'} onChange={handlePisoChange}>8</MenuItem>
                        <MenuItem value={'9'} onChange={handlePisoChange}>9</MenuItem>
                        <MenuItem value={'10'} onChange={handlePisoChange}>10</MenuItem>
                        <MenuItem value={'Sótano'} onChange={handlePisoChange}>Sótano</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100%', marginLeft: '-2%'}}>
                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Medio de Transporte</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Medio Transporte"
                        value={transporte}
                        onChange={handleTransporteChange}
                    >
                        <MenuItem value={'Caminando'} onChange={handleTransporteChange}>Caminando</MenuItem>
                        <MenuItem value={'Bicicleta'} onChange={handleTransporteChange}>Bicicleta</MenuItem>
                        <MenuItem value={'Carro particular'} onChange={handleTransporteChange}>Carro
                            particular</MenuItem>
                        <MenuItem value={'Transporte Público'} onChange={handleTransporteChange}>Transporte
                            Público</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{marginTop: 25}}>
                <ButtonIcon
                    bgColor='#00A7AF'
                    title='Siguiente'
                    onClick={() => OpenModalSec()}
                />
            </div>
            <Modal show={modalSec}>
                <Modal.Header>
                    <Modal.Title>
                        <Title title='FORMULARIO  DE  REGISTRO'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body">
                        <Container>
                            <h3>Presenta algunos de estos síntomas?</h3>
                            <hr/>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Label>
                                            <strong>Fiebre?</strong>
                                        </Form.Label>
                                        <Form.Check type="radio" id="fiebre"
                                                    onChange={e => setFiebre(e.target.value = true)}
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
                                        <Form.Check type="radio"
                                                    onChange={e => setMalestarGeneral(e.target.value = true)}
                                                    value={malestargeneral} name={'malestargeneral'} label={'Si'}/>
                                        <Form.Check type="radio"
                                                    onChange={e => setMalestarGeneral(e.target.value = false)}
                                                    value={malestargeneral} name={'malestargeneral'} label={'No'}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>
                                            <strong>Dificultad para respirar?</strong>
                                        </Form.Label>
                                        <Form.Check type="radio"
                                                    onChange={e => setDificultadRespirar(e.target.value = true)}
                                                    value={dificultadRespirar} name={'dificultadRespirar'}
                                                    label={'Si'}/>
                                        <Form.Check type="radio"
                                                    onChange={e => setDificultadRespirar(e.target.value = false)}
                                                    value={dificultadRespirar} name={'dificultadRespirar'}
                                                    label={'No'}/>

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
                                            <strong>Dolor de cabeza?</strong>
                                        </Form.Label>
                                        <Form.Check type="radio" onChange={e => setTratamiento(e.target.value = true)}
                                                    value={tratamiento} name={'tratamiento'} label={'Si'}/>
                                        <Form.Check type="radio" onChange={e => setTratamiento(e.target.value = false)}
                                                    value={tratamiento} name={'tratamiento'} label={'No'}/>
                                    </Col>
                                </Row>
                                <hr/>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    size="visible"
                                    sitekey="6LfFLNEZAAAAACWMrkWTf3aX36H0yMPX-nTjuDrl"
                                />
                                <div style={{marginTop: 25, marginLeft: "44%"}}>
                                    <ButtonIcon
                                        bgColor='#00A7AF'
                                        title='Siguiente'
                                        onClick={() => OpenModalSec()}
                                    />
                                </div>
                            </Form>
                        </Container>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonIcon bgColor='#00A7AF' title='Anterior' onClick={() => {
                        setModalSec(false)
                    }}/>
                    <ButtonIcon bgColor='#e74c3c' title='Cerrar' onClick={() => {
                        setModalSec(false)
                    }}/>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Visitante;
