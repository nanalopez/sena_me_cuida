import React, { Component } from 'react';
import { Title, SubTitle, Text } from '../../Components/common/Texts';
import { CardRol } from '../../Components/Cards/Cards';

import { Modal } from 'react-bootstrap';
// import Visitante from '../../Components/Forms/ReporteSalud/';
import RInsumo from '../../Components/Forms/Sst/rInsumo';
import RLimpieza from '../../Components/Forms/Sst/rLimpieza';
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
                    <Title title='REPORTE SST' />
                    <SubTitle title='Para reportar selecciona que deseas  en el Sena' />

                    <div className='contCards'>  
                       <div>
                        <CardRol  bgColor='#707070'  onClick={() => { this.setState({ openModal: true, rol: 'RInsumo' }) }} />
                        <img className='foto1' src={foto1} onClick={() => { this.setState({ openModal: true, rol: 'RInsumo' }) }}  />

                         <div id="cardfSST2"onClick={() => { this.setState({ openModal: true, rol: 'RInsumo' }) }}>Reporte de Limpieza</div>
                   </div>

                   <div>
                        <CardRol  bgColor='#006164'  onClick={() => { this.setState({ openModal: true, rol: 'RLimpieza' }) }} />
                        <img className='foto1' src={foto1} onClick={() => { this.setState({ openModal: true, rol: 'RLimpieza' }) }} />
                         <div id="cardfSST3" onClick={() => { this.setState({ openModal: true, rol: 'RLimpieza' }) }}>Reporte de Insumos</div>
                   </div>

                        
                        
                    </div>
                    <div className='contText'>
                        <Text
                            align='center'
                            text=""
                        />

                        </div></div>
                    <Modal show={this.state.openModal} className='widthModal'>

                        <Modal.Header>
                        
                            <Modal.Title>

                                <Title title='REPORTE DE SST' />
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                    this.state.rol === 'RInsumo' ?
                                    <RLimpieza /> :
                                    <RInsumo /> 
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