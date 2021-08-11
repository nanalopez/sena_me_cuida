import React, { Component } from 'react';
import { Title, SubTitle } from '../../../Components/common/Texts';
import { CardRol } from '../../../Components/Cards/Cards';
// import { faUserAlt, faUserTie, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

import { Modal } from 'react-bootstrap';
import Visitante from '../../../Components/Forms/Visitante';
import Aprendiz from '../../../Components/Forms/Aprendiz';
import Funcionario from '../../../Components/Forms/Funcionario';
import { ButtonIcon } from '../../../Components/common/Button';
import './estilos.css';
import NavTopInicio from '../../../Components/Navs/NavInicioSesion/NavTopInicio';
import { Footer } from '../../../Components/Footer/Footer';
import foto1 from '../.././../Assets/image/iconos/LogoSena.png';


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
                <NavTopInicio />
                    <div class='fondo2'> 
                    <div className='container'>
                    <Title title='SENA ME CUIDA' />
                    <SubTitle title='Para ingresar selecciona tu cargo en el Sena' />

                    <div className='contCards2'>

                     <div>
                        <CardRol  bgColor='#78BECE' onClick={() =>  window.location.href="/Login"} />
                         <img className='foto1' src={foto1} onClick={() =>  window.location.href="/Login"} />
                         <div id="cardf"onClick={() =>  window.location.href="/Login"}>Administrador</div>
                   </div>

                    <div>
                        <CardRol  bgColor='#707070'  onClick={() => window.location.href="/LoginSeguridad"} />
                        <img className='foto1' src={foto1} onClick={() => window.location.href="/LoginSeguridad"} />
                         <div id="cardf2"onClick={() => window.location.href="/LoginSeguridad"}>Seguridad</div>
                   </div>
                        
                        
                        
                    </div> </div>
                    <Modal show={this.state.openModal} className='widthModal'>
                        <Modal.Header>
                            <Modal.Title>
                                <Title title='FORMULARIO DE REGISTRO' />
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
                            {/* <ButtonIcon bgColor='#00A7AF' title='Registrarse' /> */}
                        </Modal.Footer>
                    </Modal>


                </div>
                <Footer />
            </div>
        )
    }
}


export default Inicio