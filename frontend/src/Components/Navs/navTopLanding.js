import React from 'react';
import { ButtonIconA } from '../common/Button';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../Assets/image/logo/LogoSena.png';
import './estilos.css';

import { Link } from 'react-router-dom';

const NavTopLanding = () => {
    return (
        <div className='containerNav'>
            <div className='Logo'>
                <img src={Logo} alt="" />
            </div>
            <Link to='/Inicio'>
                <ButtonIconA title='INGRESAR' icon={faUserCircle} />
            </Link>
        </div>
    )
}

export default NavTopLanding;