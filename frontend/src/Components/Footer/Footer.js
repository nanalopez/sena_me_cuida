import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Logo from '../../Assets/image/logo/LogoSena.png';
import icono1 from '../../Assets/image/iconos/twitter.png';
import icono2 from '../../Assets/image/iconos/Facebook.png';
import icono3 from '../../Assets/image/iconos/Instagram.png';
import icono4 from '../../Assets/image/iconos/gps.png';
import icono5 from '../../Assets/image/iconos/calendario.png';
import icono6 from '../../Assets/image/iconos/telefono.png';
import './estilos.css';

const Footer = () => {
    return (
        <div className='containerFooter'>
            <div className='logoFooter'>
                <img src={Logo} alt="" />
            </div>
            <div className='listIcons'>
                <div className='redes'>
                    <ul>
                        <li>
                            <div className='icono1'>
                                <img src={icono2} alt="" />
                            </div>
                            <a href="https://www.facebook.com/SENAAntioquia/">Facebook</a>
                        </li>
                        <li>
                            <div className='icono1'>
                                <img src={icono3} alt="" />
                            </div>
                            <a href="https://www.instagram.com/senacomunica/?hl=es-la">Instagram</a>
                        </li>
                        <li>
                            <div className='icono1'>
                                <img src={icono1} alt="" />
                            </div>
                            <a href="https://twitter.com/SENA_Antioquia">Twitter</a>
                        </li>
                    </ul>
                </div>
                <div className='redes'>
                    <ul>
                        <li>
                            <div className='icono1'>
                                  <img src={icono4} alt="" />
                            </div>
                            <h1>Dirección: Cl. 51 #57-70, Medellín, Antioquia</h1>
                        </li>
                        <li>
                            <div className='icono1'>
                               <img src={icono5} alt="" />
                            </div>
                            <h1>Horarios: lunes a viernes 8:00 a.m. a 5:30 p.m</h1>
                        </li>
                        <li>
                            <div className='icono1'>
                               <img src={icono6} alt="" />
                            </div>
                            <h1>Teléfono: 576 00 00</h1>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='copy'>
                <h5>© Todos los derechos reservados</h5>
            </div>
        </div>
    )
}

export { Footer }