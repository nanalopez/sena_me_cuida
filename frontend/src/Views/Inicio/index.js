import React, { Component } from 'react';
import { Title, SubTitle, Text } from '../../Components/common/Texts';
import { CardRol } from '../../Components/Cards/Cards';
import { ButtonIconA } from '../../Components/common/Button';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Modal } from 'react-bootstrap';
import Visitante from '../../Components/Forms/Visitante';
import Aprendiz from '../../Components/Forms/Aprendiz';
import Funcionario from '../../Components/Forms/Funcionario';
import NuevoReporte from '../../Components/Forms/ReporteSalud/NuevoReporteSalud';
import Tutorial from '../../Components/Forms/Tutorial/Tutorial';
import { ButtonIcon } from '../../Components/common/Button';
import './estilos.css';
import NavTopLanding from '../../Components/Navs/navTopLanding';
import { Footer } from '../../Components/Footer/Footer';
import foto1 from '../../Assets/image/iconos/LogoSena.png';


class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rol: '',
            openModal: false,
        }
    }
    render() {
        return (

            <div className='containerGeneral'>
            
                <NavTopLanding />
                <div className='fondo'>               
                 <div className='container'>
                    <Title title='SENA ME CUIDA' />
                    <SubTitle title='Para registrarte selecciona tu cargo en el Sena' />

                            <Link onClick={() => { this.setState({ openModal: true, rol: 'Tutorial' }) }}>
                            <ButtonIconA title='¿Como Registrarse?' />
                            </Link>

                    <div className='contCards'>
                    <div>
                        <CardRol  bgColor='#78BECE'   onClick={() => { this.setState({ openModal: true, rol: 'Visitante' }) }} />
                         <img className='foto1' src={foto1} onClick={() => { this.setState({ openModal: true, rol: 'Visitante' }) }}/>

                         <div id="cardf" onClick={() => { this.setState({ openModal: true, rol: 'Visitante' }) }}>Visitante</div>
                   </div>
                       
                       <div>
                        <CardRol  bgColor='#707070'  onClick={() => { this.setState({ openModal: true, rol: 'Funcionario' }) }} />
                        <img className='foto1' src={foto1} onClick={() => { this.setState({ openModal: true, rol: 'Funcionario' }) }}  />

                         <div id="cardf2" onClick={() => { this.setState({ openModal: true, rol: 'Funcionario' }) }}>Funcionario</div><br/>
                         <Link onClick={() => { this.setState({ openModal: true, rol: 'NuevoReporte' }) }}>
                            <ButtonIconA title='REPORTE DE SALUD' icon={faUserCircle} />
                        </Link>
                   </div>

                   <div>
                        <CardRol  bgColor='#006164'  onClick={() => { this.setState({ openModal: true, rol: 'Aprendiz' }) }} />
                        <img className='foto1' src={foto1} onClick={() => { this.setState({ openModal: true, rol: 'Aprendiz' }) }} />
                         <div id="cardf3" onClick={() => { this.setState({ openModal: true, rol: 'Aprendiz' }) }}>Aprendiz</div>
                   </div>

                        
                        
                    </div>
                    <div className='contText'>
                        <Text
                            align='center'
                            text="Tenga en cuenta que sus datos serán tratados bajo la normativa de la ley de habeas data, al ingresar sus datos usted está autorizando de manera expresa e inequívoca para mantener y manejar la información suministrada, solo para aquellas finalidades para las que se encuentra facultado el aplicativo SENA ME CUIDA y respetando en todo caso, la normatividad vigente sobre protección de datos personales."
                        />
                        <Link  to='/soporte'>
                            <a style={{color:'#707070', display:'table', marginLeft:'auto', marginRight:'auto'}}><img src={require('../../Assets/image/iconos/soporte.png')} style={{width:'35px', margin:'10px'}} />SOPORTE TECNICO</a>
                        </Link><br />
                        
                        </div></div>
                    <Modal show={this.state.openModal} className='widthModal'>

                        <Modal.Header>
                        
                            <Modal.Title>
                                {this.state.rol === 'Tutorial' ?
                                   <Title title='Tutorial de Registro' /> :
                                   this.state.rol === 'NuevoReporte' ?
                                   <Title title='Reporte de Salud' /> :
                                    <Title title='FORMULARIO  DE  REGISTRO' /> 

                            }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.state.rol === 'Visitante' ?
                                    <Visitante /> :
                                    this.state.rol === 'Funcionario' ?
                                        <Funcionario /> :
                                        this.state.rol === 'Aprendiz' ?
                                        <Aprendiz /> :
                                        this.state.rol === 'NuevoReporte' ?
                                        <NuevoReporte /> :
                                        <Tutorial />
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonIcon bgColor='#e74c3c' title='Cerrar' onClick={() => { this.setState({ openModal: false }) }} />
                        </Modal.Footer>
                    </Modal>


                </div>
                <Footer />
            </div>
        )
    }
}


export default Inicio