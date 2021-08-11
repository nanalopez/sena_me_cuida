import React from 'react';
import './estilos.css';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';


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

const RInsumo = () => {

    const classes = useStyles();

    const [tapabocas, setTapabocas] = React.useState('')
    const [amonio, setAmonio] = React.useState('')
    const [antibacterial, setAntibacterial] = React.useState("")
    const [alcohol, setAlcohol] = React.useState("")
    const [recorridos, setRecorridos] = React.useState("")

    const handleTapabocasChange = (event) => setTapabocas(event.target.value)
    const handleAmonioChange = (event) => setAmonio(event.target.value)
    const handleAntibacterialChange = (event) => setAntibacterial(event.target.value)
    const handleAlcoholChange = (event) => setAlcohol(event.target.value)
    const handleRecorridosChange = (event) => setRecorridos(event.target.value)


    function prevent() {
        document.querySelector("#tapabocas").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        document.querySelector("#amonio").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        document.querySelector("#antibacterial").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        document.querySelector("#alcohol").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        document.querySelector("#recorridos").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        
        var TAP = document.querySelector('#tapabocas');
        TAP.addEventListener('input', function () {
            if (this.value.length > 4)
                this.value = this.value.slice(0, 4);
        })
        var AMO = document.querySelector('#amonio');
        AMO.addEventListener('input', function () {
            if (this.value.length > 4)
                this.value = this.value.slice(0, 4);
        })
        var ANT = document.querySelector('#antibacterial');
        ANT.addEventListener('input', function () {
            if (this.value.length > 4)
                this.value = this.value.slice(0, 4);
        })
        var ALC = document.querySelector('#alcohol');
        ALC.addEventListener('input', function () {
            if (this.value.length > 4)
                this.value = this.value.slice(0, 4);
        })
        var REC = document.querySelector('#recorridos');
        REC.addEventListener('input', function () {
            if (this.value.length > 4)
                this.value = this.value.slice(0, 4);
        })
    }

    async function registroInsumos() {
        var tapabocas = document.querySelector('#tapabocas').value;
        var amonio = document.querySelector('#amonio').value;
        var antibacterial = document.querySelector('#antibacterial').value;
        var alcohol = document.querySelector('#alcohol').value;
        var recorridos = document.querySelector('#recorridos').value;
        if (tapabocas.length === 0) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero minimo de existencias de tapabocas!",
                timer: 10500
            })
            return (false);
        } else if (amonio.length === 0) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero minimo de existencias de amonio cuaternario!",
                timer: 10500
            })
            return (false);
        } else if (antibacterial.length === 0) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero minimo de existencias de antibacterial!",
                timer: 10500
            })
            return (false);
        } else if (alcohol.length === 0) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero minimo de existencias de alcohol!",
                timer: 10500
            })
            return (false);
        } else if (recorridos.length === 0) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero minimo de recorridos en campo!",
                timer: 10500
            })
            return (false);
        } else {
            await fetch(`${process.env.REACT_APP_API_URL}/api/reporteInsumo/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    tapabocas,
                    amonio,
                    antibacterial,
                    alcohol,
                    recorridos
                })
            })
                .then(function (result) {
                    if (result['ok'] === true) {
                        result.text().then(function (data) {
                            Swal.fire({
                                icon: 'success',
                                title: '¡BIEN!',
                                text: "¡Has registrado exitosamente el reporte de insumos!",
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
                                title: '¡ERROR!',
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
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={tapabocas}
                    onChange={handleTapabocasChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="tapabocas"
                    id='tapabocas'
                    type='number'
                    label='Número de tapabocas'
                    placeholder='Ingrese la fecha máxima de existencias de tapabocas'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={amonio}
                    onChange={handleAmonioChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="amonio"
                    id='amonio'
                    type='number'
                    label='Número de existencias de amonio cuaternario'
                    placeholder='Ingrese la fecha máxima de existencias de Amonio cuaternario'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={antibacterial}
                    onChange={handleAntibacterialChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="antibacterial"
                    id='antibacterial'
                    type='number'
                    label='Número de existencias de antibacterial'
                    placeholder='Ingrese la fecha máxima de existencias de Gel Antibacterial'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={alcohol}
                    onChange={handleAlcoholChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="alcohol"
                    id='alcohol'
                    type='number'
                    label='Número de existencias de Alcohol'
                    placeholder='Ingrese la fecha máxima de existencias de Alcohol'
                    variant="outlined"
                />
            </div>
            <div style={{width: '100%', marginTop: '1.5%'}}>
                <TextField
                    value={recorridos}
                    onChange={handleRecorridosChange}
                    onKeyDown={prevent}
                    required
                    fullWidth
                    name="recorridos"
                    id='recorridos'
                    type='text'
                    label='Número de recorridos en campo'
                    placeholder='¿Número de recorridos en campo (talleres/laboratorios) realizados  por personal administrativo para verificar el cumplimiento del protocolo por jornada?'
                    variant="outlined"
                />
            </div>
            <div style={{marginTop: 25}}>
                <ButtonIcon
                    bgColor='#00A7AF'
                    title='Siguiente'
                    onClick={() => registroInsumos()}
                />
            </div>
        </div>

    )
}

export default RInsumo;
