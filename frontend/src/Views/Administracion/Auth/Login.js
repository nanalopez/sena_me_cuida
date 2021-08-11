import React, {useState} from 'react';
import {Input} from '../../../Components/common/Inputs';
import {Button} from '../../../Components/common/Button';
import Logo from '../../../Assets/image/logo/icono_naranja_nuevo.png'
import './estilos.css'
import Swal from 'sweetalert2';


function Login() {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => setUsername(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)

    async function login() {
        await fetch(`${process.env.REACT_APP_API_URL}/api/administrador/login-admin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
            .then(function (result) {
                if (result['ok'] === true) {
                    result.text().then(function (data) {
                        localStorage.setItem('token', data)
                        const tok = JSON.parse(data)
                        localStorage.setItem('tokenT', tok.token)

                        Swal.fire({
                            title: "Bienvenido!",
                            text: "Redireccionando en 2 segundos.",
                            timer: 2000,
                            showConfirmButton: false,
                            icon: 'success'
                        }).then((result) => {
                            if (result) {
                                window.location.href = "/Admin";
                            }
                        });
                    })

                } else {
                    result.text().then(function (data) {
                        Swal.fire({
                            icon: 'error',
                            title: '¡ERROR!',
                            text: data,
                            timer: 3500
                        })
                    })
                }
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    timer: 3500
                })
            });
    }

    return (
        <div className='containerLogin'>
            <div className='contLogin'>
                <div className='logoLogin'>
                    <img src={Logo} alt=""/>
                </div>
                <div className='form'>
                    <Input
                        value={username}
                        onChage={handleUsernameChange}
                        id='usuario'
                        label='Usuario:'
                        placeholder='Ingresa tu usuario'
                    />
                    <Input
                        value={password}
                        onChage={handlePasswordChange}
                        id='password'
                        label='Contraseña:'
                        placeholder='****************************'
                        type='password'
                    />
                    <div className='contBtns'>
                        <Button title='Ingresar' bgColor='#FF6D00' onClick={() => login()}/>
                        <Button title='Volver a Inicio' bgColor='#077B75' onClick={() => window.location.href = "/"}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default (Login)
