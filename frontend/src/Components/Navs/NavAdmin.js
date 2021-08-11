import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle, faHome, faUsers, faBars} from '@fortawesome/free-solid-svg-icons';
import {Dropdown} from 'react-bootstrap';
// import { Search } from '../common/Inputs';
import LogoSena from '../../Assets/image/logo/LogoSena.png';
import './estilos.css';
import {Link} from 'react-router-dom';
import Select from '../Select/Select'

const NavAdmin = () => {
    return (
        <div className='containerNavAdmin'>
            <div className='adminTop'>
                <div className='txt'>

                    <Dropdown className='contIconNavTop'>
                        <Dropdown.Toggle variant="outline-light" className='iconNavTop'>
                            <FontAwesomeIcon icon={faBars}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item><Link to='/Admin'>Inicio</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='/Usuarios'>Usuarios</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='/habilitarUsuarios'>Habilitar Usuarios</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='/exportar'>Exportar</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='contRight'>
                    <div className='iconAdmin'>
                        <FontAwesomeIcon icon={faUserCircle}/>
                        <Select/>
                    </div>
                </div>
            </div>
            <div className='adminLateral'>
                <div className='logo'>
                    <img src={LogoSena} alt=""/>
                </div>
                <div className='menu'>
                    <ul>
                        <Link to='/Admin'>
                            <li>
                                <FontAwesomeIcon icon={faHome}/>
                                <h3>Inicio</h3>
                            </li>
                        </Link>
                        <Link to='/Usuarios'>
                            <li>
                                <FontAwesomeIcon icon={faUsers}/>
                                <h3>Usuarios</h3>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavAdmin;
