import React from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import decode from 'jwt-decode';
import Inicio from '../src/Views/Inicio';
import InicioS from './Views/Administracion/Auth/InicioS';
import Admin from '../src/Views/Administracion/administracion';
import Usuarios from '../src/Views/Administracion/usuarios';
import AdminUsuarios from '../src/Views/Administracion/AdministrarUsuarios/adminUsuarios';
import Exportar from '../src/Views/Administracion/Exports/Exportar';
import Seguridad from '../src/Views/Seguridad/Seguridad';
import SeguridadSalida from '../src/Views/Seguridad/SeguridadSalida';
import Login from '../src/Views/Administracion/Auth/Login'
import LoginSeguridad from './Views/Seguridad/Auth/LoginSeguridad'
import ReporteSalud from './Views/ReporteSalud/reporteSalud'
import Sst from './Views/Sst/Sst'
import Soporte from './Views/Soporte/Soporte'

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    let isValid = true
    try {
        isValid = decode(token);
    } catch (e) {
        return false;
    }
    return isValid;

};

const MyRoute = (props) => (
    isAuthenticated()
        ? <Route {...props} />
        : <Redirect to="/Login"/>
)

const MyRoute2 = (props) => (
    isAuthenticated()
        ? <Route {...props} />
        : <Redirect to="/LoginSeguridad"/>
)


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Inicio}/>
                {/* <Route exact path='/reporteSalud' component={ReporteSalud} /> */}
                {/*rutas por defecto*/}
                <Route exact path='/soporte' component={Soporte}/>
                <Route exact path='/SST' component={Sst}/>
                <Route exact path='/Inicio' component={InicioS}/>
                <Route exact path='/Login' component={Login}/>
                <Route exact path='/LoginSeguridad' component={LoginSeguridad}/>
                {/*Middleware*/}
                <MyRoute exact path='/Admin' component={Admin}/>
                <MyRoute exact path='/Usuarios' component={Usuarios}/>
                <MyRoute exact path='/habilitarUsuarios' component={AdminUsuarios}/>
                <MyRoute exact path='/exportar' component={Exportar}/>
                {/*Middleware seguridad*/}
                <MyRoute2 exact path='/Seguridad' component={Seguridad}/>
                <MyRoute2 exact path='/SeguridadSalida' component={SeguridadSalida}/>


            </Switch>
        </BrowserRouter>
    );
}

export default App;
