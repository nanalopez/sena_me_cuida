import React, { Component } from 'react';
import './estilos.css';
import NavSeguridad from '../../Components/Navs/NavSeguridad/NavSeguridad';

import NuevoIngreso from '../../Components/Forms/Ingreso/NuevoIngreso'
import { TitleIng, Title, SubTitle } from '../../Components/common/Texts';


class Admin extends Component {
    
    render() {
        return ( 
            <div className='containerSeguridad'>
                <NavSeguridad></NavSeguridad><br/><br/><br/><br/><br/><br/>
                <TitleIng titleing='VERIFICAR INGRESO' />
                <br/>
                    <div className=''>
                        <NuevoIngreso />
                    </div> 
                
            </div>
        )
    }
}

export default Admin