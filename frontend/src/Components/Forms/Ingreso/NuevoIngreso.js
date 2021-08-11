import React, {Component, useEffect} from 'react';
import {Title, SubTitle, Text} from '../../../Components/common/Texts';
import Swal from 'sweetalert2';
import {ButtonIcon} from '../../../Components/common/Button';
// import './styles.css';
import NavTopLanding from '../../../Components/Navs/navTopLanding';
import {Footer} from '../../../Components/Footer/Footer';
import TextField from '@material-ui/core/TextField';
import ReCAPTCHA from "react-google-recaptcha";
import Axios from 'axios'


function NuevoIngreso() {

    const [documentoIdentidad, setDocumentoIdentidad] = React.useState('')
    const [temperatura, setTemperatura] = React.useState('')
    const [cTemperatura, setCTemperatura] = React.useState(true)
    const [cDocumento, setCDocumento] = React.useState(false)
    const [dataState, setDataState] = React.useState({})
    const [registroState, setRegistroState] = React.useState('')

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
                if (temperatura.length === 2) {
                    if (registroState === 'APRENDIZ') {
                        registroConTemperaturaAprendiz();
                    } else if (registroState === 'FUNCIONARIO') {
                        registroConTemperaturaFuncionario();
                    } else {
                        registroConTemperaturaVisitante();
                    }
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡ALERTA!',
                    text: "¡NO SE PUEDE INGRESAR POR SU TEMPERATURA!",
                    timer: 10500
                })
                // registroNoIngreso()
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
                    result.text().then(function (data) {
                        // console.log(data);
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
                                                    title: '¡APRENDIZ ENCONTRADO!',
                                                    text: "AHORA DIGITA LA TEMPERATURA",
                                                    timer: 10500
                                                })
                                                setRegistroState('APRENDIZ')
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
                } else if (result['ok'] === false) {
                    fetch(`${process.env.REACT_APP_API_URL}/api/funcionario/ingreso`, {
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
                                    // console.log(data);
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
                                                                title: '¡FUNCIONARIO ENCONTRADO!',
                                                                text: "AHORA DIGITA LA TEMPERATURA",
                                                                timer: 10500
                                                            })
                                                            setRegistroState('FUNCIONARIO')
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
                            } else if (result['ok'] === false) {
                                fetch(`${process.env.REACT_APP_API_URL}/api/visitante/ingreso`, {
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
                                                // console.log(data);
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
                                                                            title: '¡VISITANTE ENCONTRADO!',
                                                                            text: "AHORA DIGITA LA TEMPERATURA",
                                                                            timer: 10500
                                                                        })
                                                                        setRegistroState('VISITANTE')
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

    async function registroConTemperaturaAprendiz() {


        let data = JSON.parse(dataState);
        const temp = {"temperatura": temperatura};

        data = {...data, ...temp};

        await fetch(`${process.env.REACT_APP_API_URL}/api/estadoAprendiz/create`, {
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

    async function registroConTemperaturaFuncionario() {


        let data = JSON.parse(dataState);
        const temp = {"temperatura": temperatura};

        data = {...data, ...temp};

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

    async function registroConTemperaturaVisitante() {


        let data = JSON.parse(dataState);
        const temp = {"temperatura": temperatura};

        data = {...data, ...temp};

        await fetch(`${process.env.REACT_APP_API_URL}/api/estadoVisitante/create`, {
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
                focused={true}
                autoFocus={true}
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

export default NuevoIngreso;
