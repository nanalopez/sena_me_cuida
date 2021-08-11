import React, {Component} from 'react';
import NavAdmin from "../../../Components/Navs/NavAdmin";
import {Title} from "../../../Components/common/Texts";
import Suspendidos from '../../../Components/Table/TableSuspendidos/suspendidos'

class AdminUsuarios extends Component {
    render() {
        return (
            <div className='containerAdmin'>
                <NavAdmin></NavAdmin>
                <Title title='Usuarios suspendidos'/>
                <Suspendidos/>
            </div>
        );
    }
}

export default AdminUsuarios;
