import React from 'react';
import './estilos.css';

const Title = ({title}) => {
    return (
        <div className='title'>
            <h2>{title}</h2>
        </div>
     )
}

const TitleIng = ({titleing}) => {
    return (
        <div className='titleIng'>
            <h2>{titleing}</h2>
        </div>
     )
}

const SubTitle = ({title})=>{
    return(
    <div className='subTitle'>
        <h4>{title}</h4>
    </div>

    )
}
const Text = ({text, align})=>{
    return(
        <div className='text'>
            <p style={{textAlign: align}}>{text}</p>
        </div>
    )
}

export {Title, TitleIng, SubTitle, Text}
