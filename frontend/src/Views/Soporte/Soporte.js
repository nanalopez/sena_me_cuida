import React, { Component } from 'react';
import { Title, SubTitle, Text } from '../../Components/common/Texts';
import Swal from 'sweetalert2';
import { ButtonIcon } from '../../Components/common/Button';
import './styles.css';
import NavTopLanding from '../../Components/Navs/navTopLanding';
import { Footer } from '../../Components/Footer/Footer';
import TextField from '@material-ui/core/TextField';
import ReCAPTCHA from "react-google-recaptcha";



function Inicio() {

    const recaptchaRef = React.createRef();

    const [nombre, setNombre] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')

    const handleNombreChange = (event) => setNombre(event.target.value)
    const handleEmailChange = (event) => setEmail(event.target.value)
    const handleTelefonoChange = (event) => setTelefono(event.target.value)
    const handleDescripcionChange = (event) => setDescripcion(event.target.value)


    function prevent() {
        document.querySelector("#nombre").addEventListener("keypress", function (evt) {
            if (!(evt.which >= 65 && evt.which <= 122) && (evt.which !== 32 && evt.which !== 0) && !(evt.which === 241)) {
                evt.preventDefault();
            }
        });
        document.querySelector("#telefono").addEventListener("keypress", function (evt) {
            if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
        
        var NTEL = document.querySelector('#telefono');
        NTEL.addEventListener('input', function () {
            if (this.value.length > 10)
                this.value = this.value.slice(0, 10);
        })
    }

    async function registroSolicitud() {
        var nombre = document.querySelector('#nombre').value;
        const seleccionado = recaptchaRef.current.getValue()
        var telefono = document.querySelector('#telefono').value;
        var descripcionProblema = document.querySelector('#descripcionProblema').value;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var email = document.querySelector('#email').value;
        if (reg.test(email) == false) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar una direccion de correo electronico valida!",
                timer: 10500
            })
            return (false);
        } else if (nombre.length < 8) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar tu nombre completo!",
                timer: 10500
            })
            return (false);
        }  else if (telefono.length < 7) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar un numero de telefono valido!",
                timer: 10500
            })
            return (false);
        } else if (descripcionProblema.length < 10) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: "¡Debes ingresar almenos 10 caracteres en la descripción!",
                timer: 10500
            })
            return (false);
        } else {

            if(seleccionado){
                await fetch(`${process.env.REACT_APP_API_URL}/api/soporte/create`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        nombre,
                        telefono,
                        email,
                        descripcionProblema
                    })
                })
                    .then(function (result) {
                        if (result['ok'] === true) {
                            result.text().then(function (data) {
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡BIEN!',
                                    text: "¡Solicitud enviada!",
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
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: "¡Por favor verifique que no es un bot!",
                    timer: 10500
                })
            }
        }
    }
    
        return (

            <div className='containerGeneral'>
                <NavTopLanding />
                <div className='fondo'>               
                 <div className='container'>
                    <Title title='SOPORTE TECNICO' />
                    <SubTitle title='Para reportar tu incidante debes llenar el siguiente formulario' />

                    <div className='contInputs'> 
                        <div style={{width: '50%', marginTop: '1.5%'}}>
                            <TextField
                                value={nombre}
                                onChange={handleNombreChange}
                                onKeyDown={prevent}
                                required
                                fullWidth
                                name="nombre"
                                id='nombre'
                                type='text'
                                label='Nombre Completo'
                                placeholder='Ingresa tu nombre completo'
                                variant="outlined"
                            />
                        </div>
                        <div style={{width: '50%', marginTop: '1.5%'}}>
                            <TextField
                                value={email}
                                onChange={handleEmailChange}
                                required
                                fullWidth
                                name="email"
                                id='email'
                                type='text'
                                label='Email'
                                placeholder='Ingresa tu Email'
                                variant="outlined"
                            />
                        </div>
                        <div style={{width: '50%', marginTop: '1.5%'}}>
                            <TextField
                                value={telefono}
                                onChange={handleTelefonoChange}
                                onKeyDown={prevent}
                                required
                                fullWidth
                                name="telefono"
                                id='telefono'
                                type='text'
                                label='Telefono'
                                placeholder='Ingresa tu telefono'
                                variant="outlined"
                            />
                        </div>
                        <div style={{width: '50%', marginTop: '1.5%'}}>
                            <TextField
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                required
                                fullWidth
                                name="descripcionProblema"
                                id='descripcionProblema'
                                type='text'
                                label='Descripción del Problema'
                                placeholder='Ingresa la descripción del problema'
                                variant="outlined"
                            />
                        </div>
                    </div><br/>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="visible"
                            sitekey="6LfFLNEZAAAAACWMrkWTf3aX36H0yMPX-nTjuDrl"
                        /><br/>
                        <ButtonIcon
                            bgColor='#00A7AF'
                            title='Enviar'
                            onClick={() => registroSolicitud()}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

export default Inicio