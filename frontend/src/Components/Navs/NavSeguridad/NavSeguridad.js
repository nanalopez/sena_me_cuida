import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faHome, faBars, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import LogoSena from '../../../Assets/image/logo/LogoSena.png';
import './estilos.css';
import { Link } from 'react-router-dom';
import Select from '../../Select/Select'

const NavAdmin = () => {
    return (
        <div className='containerNavSeguridad'>
            <div className='seguridadTop'>
                <div className='txt'>
                    
                    <Dropdown className='contIconNavTop'>
                        <Dropdown.Toggle variant="outline-light" className='iconNavTop'>
                            <FontAwesomeIcon icon={faBars} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item><Link to='/Seguridad'>Verificar Ingreso</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='/SeguridadSalida'>Verificar Salida</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='contRight'>
                    <div className='iconSeguridad'>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <Select />
                    </div>
                </div>
            </div>
            <div className='seguridadLateral'>
                <div className='logo'>
                    <img src={LogoSena} alt="" />
                </div>
                <div className='menu'>
                    <ul>
                        <Link to='/Seguridad'>
                            <li>
                                <FontAwesomeIcon icon={faHome} />
                                <h3>Validar Ingreso</h3>
                            </li>
                        </Link>
                    </ul>
                    <ul>
                        <Link to='/SeguridadSalida'>
                            <li>
                                <FontAwesomeIcon icon={faDoorOpen} />
                                <h3>Validar Salida</h3>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavAdmin;