import React, { Component } from 'react';
import './estilos.css';
import NavSeguridad from '../../Components/Navs/NavSeguridad/NavSeguridad';

// import Table from '../../Components/Table/Table';
//import { Card, CardInfo } from '../../Components/Cards/Cards';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { CardRol } from '../../Components/Cards/Cards';
import { Title, TitleIng, SubTitle } from '../../Components/common/Texts';
import { ButtonIcon } from '../../Components/common/Button';
import NuevaSalida from '../../Components/Forms/Salida/NuevaSalida'


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rol: '',
            openModal: false,
        }
    }
    render() {
        return ( 
            <div className='containerSeguridad'>
                <NavSeguridad></NavSeguridad><br/><br/><br/><br/><br/><br/>
                <TitleIng titleing='VERIFICAR SALIDA' />
                <br/>
                    <div className=''>
                        <NuevaSalida />
                    </div> 
            </div>
        )
    }
}

export default Admin