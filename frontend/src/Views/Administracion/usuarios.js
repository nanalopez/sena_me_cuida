import React, { Component } from 'react';


import './estilos.css';
import NavAdmin from '../../Components/Navs/NavAdmin';
//import Table from '../../Components/Table/Table';
import TableAprendiz from '../../Components/Table/TableAprendiz/Table';
import TableFuncionaro from '../../Components/Table/TableFuncionario/Table';
import TableVisitante from '../../Components/Table/TableVisitante/Table';
// import { Card, CardInfo } from '../../Components/Cards/Cards';
import CardInfoAprendiz from '../../Components/Cards/CardAprendiz/CardInfoAprendiz';
import CardInfoVisitante from '../../Components/Cards/CardVisitante/CardInfoVisitante';
import CardInfoFuncionario from '../../Components/Cards/CardFuncionario/CardInfoFuncionario';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Title } from '../../Components/common/Texts';


class Admin extends Component {
    render() {
        return (
            <div className='containerAdmin'>

                <NavAdmin></NavAdmin>

                <div style={{padding:'1%'}}></div>
                <Title title='VISITANTES REGISTRADOS' />
                    <div className='contCardsInfo'>
                        <CardInfoVisitante />
                    </div>
                <div className='contAdmin1'>
                    <div className='contEstadisticas'>
                        <TableVisitante />
                    </div>
                </div>
                <div style={{padding:'3%'}}></div>
                <Title title='FUNCIONARIOS REGISTRADOS' />
                    <div className='contCardsInfo'>
                        <CardInfoFuncionario />
                    </div>
                <div className='contAdmin1'>
                    <div className='contEstadisticas'>
                        <TableFuncionaro />
                    </div>
                </div>
                <div style={{padding:'2%'}}></div>
                <Title title='APRENDICES REGISTRADOS' />
                    <div className='contCardsInfo'>
                        <CardInfoAprendiz />
                    </div>
                <div className='contAdmin1'>
                    <div className='contEstadisticas'>
                        <TableAprendiz />
                    </div>
                </div>

            </div>

        )
    }
}

export default Admin
