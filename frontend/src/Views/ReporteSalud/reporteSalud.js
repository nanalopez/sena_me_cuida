import React, { Component } from 'react';
import { Title, SubTitle, Text } from '../../Components/common/Texts';
import { CardRol } from '../../Components/Cards/Cards';

import { Modal } from 'react-bootstrap';
// import Visitante from '../../Components/Forms/ReporteSalud/';
import Aprendiz from '../../Components/Forms/ReporteSalud/reporteSaludAprendiz';
import Funcionario from '../../Components/Forms/ReporteSalud/reporteSaludFuncionario';
import Visitante from '../../Components/Forms/ReporteSalud/reporteSaludVisitante';
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
                    <Title title='REPORTE DE SALUD' />
                    <SubTitle title='Para reportarte selecciona tu cargo en el Sena' />

                    <div className='contCards'> 
                        <div>
                            <CardRol  bgColor='#78BECE'   onClick={() => { this.setState({ openModal: true, rol: 'Visitante' }) }} />
                            <img className='foto1' src={foto1} onClick={() => { this.setState({ openModal: true, rol: 'Visitante' }) }}/>

                            <div id="cardf" onClick={() => { this.setState({ openModal: true, rol: 'Visitante' }) }}>Visitante</div>
                    </div>  
                       <div>
                        <CardRol  bgColor='#707070'  onClick={() => { this.setState({ openModal: true, rol: 'Funcionario' }) }} />
                        <img className='foto1' src={foto1} onClick={() => { this.setState({ openModal: true, rol: 'Funcionario' }) }}  />

                         <div id="cardf2"onClick={() => { this.setState({ openModal: true, rol: 'Funcionario' }) }}>Funcionario</div>
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

                        </div></div>
                    <Modal show={this.state.openModal} className='widthModal'>

                        <Modal.Header>
                        
                            <Modal.Title>

                                <Title title='REPORTE DE SALUD' />
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                    this.state.rol === 'Visitante' ?
                                    <Visitante /> :
                                    this.state.rol === 'Funcionario' ?
                                        <Funcionario /> :
                                        <Aprendiz />
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