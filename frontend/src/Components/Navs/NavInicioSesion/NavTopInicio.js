import React from 'react';
// import { ButtonIconA } from '../../common/Button';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../Assets/image/logo/LogoSena.png';
import './estilos1.css';

// import { Link } from 'react-router-dom';

const NavTopLanding = () => {
    return (
        <div className='containerNavInicio'>
            <div className='Logo'>
                <img src={Logo} alt="" />
            </div>
        </div>
    )
}

export default NavTopLanding;