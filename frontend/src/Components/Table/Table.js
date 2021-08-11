import React from 'react';

import './estilos.css';

const Table = () => {
    return (
        <div className='containerTable'>
            <table className='table'>
                <thead className='titleTable'>
                    <tr>
                        <td>Nombre1</td>
                        <td>Nombre</td>
                        <td>Nombre</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Algo</td>
                        <td>Algo de texto</td>
                        <td>Algo de texto</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default (Table);