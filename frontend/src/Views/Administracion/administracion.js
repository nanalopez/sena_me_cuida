import React from 'react';


import './estilos.css';
import NavAdmin from '../../Components/Navs/NavAdmin';
//import Table from '../../Components/Table/Table';
import Pie from '../../Components/Graphics/Pie';
import Line from '../../Components/Graphics/Line';
import Doughnut from '../../Components/Graphics/Doughnut';
import Doughnut1 from '../../Components/Graphics/Douhhnut1';
import Doughnut2 from '../../Components/Graphics/Doughnut2';
import Doughnut3 from '../../Components/Graphics/Doughnut3';
import IngresoAprendices from '../../Components/Graphics/Ingresos/IngresoAprendices';
import IngresoFuncionarios from '../../Components/Graphics/Ingresos/ingresoFuncionarios';
import IngresoVisitantes from '../../Components/Graphics/Ingresos/ingresoVisitantes';
import {TitleIng} from '../../Components/common/Texts';
import {Tab, Row, Col, Nav} from 'react-bootstrap'


function Admin() {

    function actualizar() {
        window.location.reload(true);
    }

    setInterval(() => {
        actualizar()
    }, 100000);
    return (
        <div className='containerAdmin'>
            <NavAdmin></NavAdmin>
            <TitleIng titleing='ESTADÍSTICAS'/>
            <div className='contAdmin'>
                <div className='contEstadisticas'>
                    <Pie/>
                </div>
                <div className='contEstadisticas'>
                    <Doughnut2/>
                </div>
            </div>
            <div className='contAdmin'>
                <div className='contEstadisticas'>
                    <Doughnut1/>
                </div>
                <div className='contEstadisticas'>
                    <Doughnut3/>
                </div>
            </div>
            <div className='contAdmin'>
                <div className='contEstadisticas'>
                    {/* <Doughnut1 /> */}
                </div>
                <div className='contEstadisticas'>
                    <Doughnut/>
                </div>
                <div className='contEstadisticas'>
                    {/* <Doughnut /> */}
                </div>
            </div>
            <div className='alert alert-info lg'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="tabs" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link className={'text-secondary'} eventKey="first">Registro Personas</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={'text-secondary'} eventKey="second">Ingreso
                                        Aprendices</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={'text-secondary'} eventKey="third">Ingreso
                                        Funcionarios</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={'text-secondary'} eventKey="fourth">Ingreso
                                        Visitantes</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className='container '>
                                        <Line/>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div className='container'>
                                        <IngresoAprendices/>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <div className='container'>
                                        <IngresoFuncionarios/>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <div className='container'>
                                        <IngresoVisitantes/>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>

        </div>
    )
}

export default Admin
