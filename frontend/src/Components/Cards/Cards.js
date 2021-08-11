import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './estilos.css';

const Card = ({ content }) => {
    return (
        <div className='card'>
            {content}
        </div>
    );
}

const CardRol = ({ title, icon, bgColor, onClick }) => {
    return (
        <div onClick={onClick} className='cardRol' style={{ background: bgColor }}>
            <FontAwesomeIcon icon={icon} />
            <h5>{title}</h5>
        </div>

    )
}
const CardInfo = ({ bgColor, onClick, icon, title, info }) => {
    return (
        <div onClick={onClick} className='cardInfo' style={{ background: bgColor }}>
            <div className='topCardInfo'>
                <FontAwesomeIcon icon={icon} />
                <h4>{title}</h4>
            </div>
            <h5>{info}</h5>
        </div>
    )
}

export { Card, CardRol, CardInfo };