import React, {useEffect, useState} from 'react';
import NavAdmin from "../../../Components/Navs/NavAdmin";
import {Title} from "../../../Components/common/Texts";
import Axios from "axios";
import {Spinner, Alert, Table, Row, Col, Container} from 'react-bootstrap'
import {Button} from "../../../Components/common/Button";
import {faFileExcel, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Exportar() {

    let Mensaje = 'Cargando'
    const [DataArray, setDataArray] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [IsInList, setIsInList] = useState(false)
    const [IsLoading, setIsloading] = useState(false)

    let Fecha = new Date()
    let ParseDate = `${Fecha.getDate()}-${Fecha.getMonth() + 1}-${Fecha.getFullYear()}`

    const array = [
        {
            nombre: 'Visitante',
            url: 'TablaVisitante'
        },
        {
            nombre: 'Aprendiz',
            url: 'TablaAprendiz'
        },
        {
            nombre: 'Funcionario',
            url: 'TablaFuncionario'
        },
        {
            nombre: 'Estado Visitante',
            url: 'TablaEstadoVisitante'
        },
        {
            nombre: 'Estado Aprendiz',
            url: 'TablaEstadoAprendiz'
        },
        {
            nombre: 'Estado Funcionario',
            url: 'TablaEstadoFuncionario'
        },
        {
            nombre: 'Reporte Insumos',
            url: 'TablaReporteInsumos'
        },
        {
            nombre: 'Reporte Limpieza',
            url: 'TablaReporteLimpieza'
        },
        {
            nombre: 'Reporte Salud',
            url: 'TablaReporteSalud'
        },
        {
            nombre: 'Reporte Salud Dia',
            url: 'TablaReporteSaludDia'
        },
        {
            nombre: 'Salida Dias',
            url: 'TablaSalidaDias'
        },
        {
            nombre: 'Usuario Suspendido',
            url: 'TablaUsuarioSuspendido'
        },
    ]

    const ListarDatos = async () => {
        try {
            const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/csv/listardatos`, {
                headers: {'token': `${localStorage.getItem('tokenT')}`}
            })

            setIsFetching(true)
            setDataArray(res.data.data)

        } catch (e) {
            console.log(e)
        }


    }

    const onSubmit = async (event) => {
        event.preventDefault()
        setIsloading(true)
        Axios.post(`${process.env.REACT_APP_API_URL}/api/csv/exportar`, {data: DataArray})
            .then(res => {
                setIsloading(false)
                setIsInList(true)

            })
            .catch(err => {
                console.log(err)
            })

    }

    function listar() {
        return array.map(item => (
            <tr>
                <td>
                    <FontAwesomeIcon icon={faFileExcel}/>&nbsp;
                    {item.nombre}
                </td>
                <td>
                    <a href={`${process.env.REACT_APP_API_URL}/exports/${item.url}-${ParseDate}.csv`}
                       className="btn btn-success" style={{backgroundColor: "#077B75"}}>Descargar
                    </a>
                </td>
            </tr>
        ))
    }

    useEffect(() => {
        ListarDatos()
        listar()

    }, [])


    return (
        <div>
            <NavAdmin/>
            <Title title='Exportar Datos'/>
            <Container fluid={"lg"} className={"mt-3"}>
                <Row>
                    <Col sm={4}>
                        <form onSubmit={onSubmit}>
                            {isFetching ?
                                <Alert variant="success">
                                    <Alert.Heading>Sena me cuida</Alert.Heading>
                                    <hr/>
                                    <div className="d-flex justify-content-center">

                                        <Button title='Listar Tablas' type={'submit'} bgColor='#077B75'/>
                                    </div>
                                    <hr/>
                                </Alert>
                                :
                                <Alert variant="success">
                                    <div className="d-flex justify-content-center">
                                        <Alert.Heading> {Mensaje} <Spinner animation="border"/></Alert.Heading>
                                    </div>

                                    <hr/>
                                    <p className="mb-0">
                                        Obteniendo datos actuales
                                    </p>
                                </Alert>
                            }
                        </form>

                    </Col>
                    <Col sm={8}>
                        {IsLoading ?
                            <div className={'container sm d-flex justify-content-center'}>
                                <strong>Cargando</strong>
                                <Spinner animation="border"/>
                            </div>

                            :
                            <div>
                                {IsInList ?
                                    <div className="container sm d-flex justify-content-center">
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr>
                                                <th>Tabla</th>
                                                <th>Accion</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {listar()}
                                            </tbody>
                                        </Table>
                                    </div>
                                    :

                                    <Alert variant="info">
                                        <Alert.Heading>Espere un momento...</Alert.Heading>
                                        <p>
                                            El sistema esta copilando la información del día para ser exportada en
                                            formato
                                            excel.
                                        </p>
                                        <hr/>
                                        <strong className="mb-0">
                                            Cuando termine de cargar presione el boton listar tablas para descargar la
                                            tabla que
                                            desee.
                                        </strong>
                                    </Alert>
                                }
                            </div>
                        }


                    </Col>
                </Row>
            </Container>


        </div>
    );
}

export default Exportar
