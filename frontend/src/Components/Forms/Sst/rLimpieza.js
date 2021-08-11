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
import {Title} from '../../../Components/common/Texts';
import {Form, Container, Row, Col, Button} from 'react-bootstrap'


// import { Input } from '../common/Inputs';
import {ButtonIcon} from '../../../Components/common/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const RLimpieza = () => {

    const recaptchaRef = React.createRef();
    const classes = useStyles();


    const [ambiente, setAmbiente] = React.useState('')
    const [personas, setPersonas] = React.useState('')
    const [PEncargada, setPEncargada] = React.useState("")
    const [piso, setPiso] = React.useState("")
    const [torre, setTorre] = React.useState("")
    const [aantes, setAantes] = React.useState("")
    const [adespues, setAdespues] = React.useState("")
    const [mantes, setMantes] = React.useState("")
    const [mdespues, setMdespues] = React.useState("")



    const handleAmbienteChange = (event) => setAmbiente(event.target.value)
    const handlePersonasChange = (event) => setPersonas(event.target.value)
    const handlePEncargadaChange = (event) => setPEncargada(event.target.value)
    const handlePisoChange = (event) => setPiso(event.target.value)
    const handleTorreChange = (event) => setTorre(event.target.value)
    const handleAantesChange = (event) => setAantes(event.target.value)
    const handleAdespuesChange = (event) => setAdespues(event.target.value)
    const handleMantesChange = (event) => setMantes(event.target.value)
    const handleMdespuesChange = (event) => setMdespues(event.target.value)


    //Segundo modal
    const [modalSec, setModalSec] = React.useState(false);
    const OpenModalSec = () => setModalSec(true);

    function prevent() {
        document.querySelector("#ambiente").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        
        var NID = document.querySelector('#ambiente');
        NID.addEventListener('input', function () {
            if (this.value.length > 3)
                this.value = this.value.slice(0, 3);
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        let valores = [
            aantes,
            adespues,
            mantes,
            mdespues,
        ]

        const sintomas = valores.reduce(
            (out, bool, index) => bool ? out.concat(index) : out,
            []
        )

        let AAntes = document.getElementsByName('aantes')
        let S_AAntes = false
        for (let i = 0; i < AAntes.length; i++) {
            if (AAntes[i].checked) {
                S_AAntes = true
                break;
            }
        }

        let ADespues = document.getElementsByName('adespues')
        let S_ADespues = false
        for (let i = 0; i < ADespues.length; i++) {
            if (ADespues[i].checked) {
                S_ADespues = true
                break;
            }
        }

        let MAntes = document.getElementsByName('mantes')
        let S_MAntes = false
        for (let i = 0; i < MAntes.length; i++) {
            if (MAntes[i].checked) {
                S_MAntes = true
                break;
            }
        }

        let MDespues = document.getElementsByName('mdespues')
        let S_MDespues = false
        for (let i = 0; i < MDespues.length; i++) {
            if (MDespues[i].checked) {
                S_MDespues = true
                break;
            }
        }

            if (S_AAntes && S_ADespues && S_MAntes && S_MDespues) {
                if (sintomas.length >= 3) {
                    registroLimpieza(valores);
                    
                } else {
                    registroLimpieza(valores);
                }
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Vacio',
                    text: '¡Debe responder todas las preguntas!',
                    timer: 10500
                })
                return false
            }
    }

    async function registroLimpieza(valores) {
        let preguntas = valores
        var ambiente = document.querySelector('#ambiente').value;
        var personas = document.querySelector('#personas').value;
        if (ambiente.length < 3) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero de ambiente valido!",
                timer: 10500
            })
            return (false);
        } else if (personas.length < 15) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar el nombre completo de las personas encargadas!",
                timer: 10500
            })
            return (false);
        } else {
            await fetch(`${process.env.REACT_APP_API_URL}/api/reporteLimpieza/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    ambiente,
                    personas,
                    PEncargada, 
                    piso,
                    torre,
                    preguntas
                })
            })
                .then(function (result) {
                    if (result['ok'] === true) {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'success',
                                title: '¡BIEN!',
                                text: "¡Has registrado con exito el reporte de limpieza!"+ data,
                                timer: 10500
                            })
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        })
                    } else {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'error',
                                title: data,
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
            <div style={{width: '100%', marginTop: '1%', marginLeft: '-2%'}}>
            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Persona Encargada</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="PEncargada"
                        value={PEncargada}
                        onChange={handlePEncargadaChange}
                    >
                        <MenuItem value={'Noris Angela Martinez Ciro'} onChange={handlePEncargadaChange}>Noris Angela Martinez Ciro</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100%', marginLeft: '-2%'}}>
                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Torre</InputLabel>
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
                        label="N° Piso"
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
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={ambiente}
                    onChange={handleAmbienteChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="ambiente"
                    id='ambiente'
                    type='number'
                    label='Número de ambiente'
                    placeholder='Ingresa el numero del ambiente'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={personas}
                    onChange={handlePersonasChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="personas"
                    id='personas'
                    type='text'
                    label='Personas Encargadas'
                    placeholder='Ingresa el nombre de las personas encargadas de la limpieza'
                    variant="outlined"
                />
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
                        <Title title='FORMULARIO  SST'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body">
                        <Container>
                            <h3>Se cumplió con lo siguiente?</h3>
                            <hr/>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Label>
                                            <strong>Se realizó la desinfección y limpieza de ambiente de formación antes de la jornada?</strong>
                                        </Form.Label>
                                        <Form.Check type="radio" id="aantes"
                                                    onChange={e => setAantes(e.target.value = true)}
                                                    value={aantes} name={'aantes'} label={'Si'}/>
                                        <Form.Check type="radio" onChange={e => setAantes(e.target.value = false)}
                                                    value={aantes} name={'aantes'} label={'No'}/>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row>
                                    <Col>
                                        <Form.Label>
                                            <strong>Se realizó la desinfección y limpieza de ambiente de formación después de la jornada?</strong>
                                        </Form.Label>
                                        <Form.Check type="radio" onChange={e => setAdespues(e.target.value = true)}
                                                    value={adespues} name={'adespues'} label={'Si'}/>
                                        <Form.Check type="radio" onChange={e => setAdespues(e.target.value = false)}
                                                    value={adespues} name={'adespues'} label={'No'}/>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Form.Label>
                                            <strong>Se realizó la desinfección y limpieza de máquinas y herramientas antes de la jornada?</strong>
                                        </Form.Label>
                                        <Form.Check type="radio" onChange={e => setMantes(e.target.value = true)}
                                                    value={mantes} name={'mantes'} label={'Si'}/>
                                        <Form.Check type="radio" onChange={e => setMantes(e.target.value = false)}
                                                    value={mantes} name={'mantes'} label={'No'}/>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Form.Label>
                                            <strong>Se realizó la desinfección y limpieza de máquinas y herramientas después de la jornada?</strong>
                                        </Form.Label>
                                        <Form.Check type="radio" onChange={e => setMdespues(e.target.value = true)}
                                                    value={mdespues} name={'mdespues'} label={'Si'}/>
                                        <Form.Check type="radio" onChange={e => setMdespues(e.target.value = false)}
                                                    value={mdespues} name={'mdespues'} label={'No'}/>
                                    </Col>
                                </Row>
                                <hr/>
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

export default RLimpieza;
