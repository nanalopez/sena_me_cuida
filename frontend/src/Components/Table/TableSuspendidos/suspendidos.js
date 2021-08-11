import React, {Component} from 'react';
//Material Table
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import Axios from 'axios'
import Swal from 'sweetalert2';

const columns = [
    {
        field: "nombre",
        title: "Nombre"

    },
    {
        field: "email",
        title: "Email",

    },
    {
        field: "documentoIdentidad",
        title: "Documento de Identidad",

    },
    {
        field: "telefono",
        title: "Telefono",

    },
    {
        field: "direccionResidencia",
        title: "Direccion Residencia",

    },
    {
        field: "eps",
        title: "EPS",

    },
    {
        field: "jornada",
        title: "Jornada",

    },

]


class TableSuspendidos extends Component {

    state = {
        suspendidos: []
    }

    async ListarUsuario() {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/habilitar/listarsuspendidos`, {
            headers: {
                'token': `${localStorage.getItem('tokenT')}`
            }
        })
        this.setState({suspendidos: res.data})
    }

    async componentDidMount() {
        await this.ListarUsuario()
    }

    render() {
        return (
            <div className='containerAdmin2'>

                <MaterialTable
                    icons={{
                        Add: AddBox,
                        Check: Check,
                        Clear: Clear,
                        Delete: DeleteOutline,
                        DetailPanel: ChevronRight,
                        Edit: Edit,
                        Export: SaveAlt,
                        Filter: FilterList,
                        FirstPage: FirstPage,
                        LastPage: LastPage,
                        NextPage: ChevronRight,
                        PreviousPage: ChevronLeft,
                        ResetSearch: Clear,
                        Search: Search,
                        SortArrow: ArrowDownward,
                        ThirdStateCheck: Remove,
                        ViewColumn: ViewColumn
                    }}
                    title={"Lista de Usuarios"}
                    data={this.state.suspendidos}
                    columns={columns}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Habilitar Usuario',
                            onClick: (event, rowData) => {
                                const {_id, nombre} = rowData

                                Swal.fire({
                                    icon: 'info',
                                    title: "Atención!",
                                    text: `Desea Habilitar a ${nombre}`,
                                    showConfirmButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'Habilitar',
                                    cancelButtonText: "Cancelar"
                                }).then((isConfirm) => {
                                    if (isConfirm.value) {
                                        Axios.post(`${process.env.REACT_APP_API_URL}/api/habilitar/habilitarUsuario/${_id}`, {
                                            headers: {
                                                'token': `${localStorage.getItem('tokenT')}`
                                            }
                                        }).then(res => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: `${res.data.message}`,
                                                timer: 2000,
                                                showConfirmButton: true,
                                                showCancelButton: false,
                                            })
                                            this.ListarUsuario()
                                        }).catch(e => {
                                            console.log(e)
                                            Swal.fire({
                                                icon: 'error',
                                                title: `${e.response.data}`,
                                                showCancelButton: false,
                                                showConfirmButton: true,
                                            })
                                        })
                                    }
                                });
                            }
                        }
                    ]}
                />
            </div>
        )
    }
}

export default TableSuspendidos
