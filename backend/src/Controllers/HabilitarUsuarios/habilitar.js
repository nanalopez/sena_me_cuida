const UsuarioSuspendido = require('../../Models/Ingreso/tbl_ingresoSuspendido')
const {emailSend} = require('../HabilitarUsuarios/mailSuccess');

exports.Listar_Suspendidos = async (req, res) => {

    try {

        const Usuarios = await UsuarioSuspendido.find()
        res.status(200).send(Usuarios)

    } catch (e) {
        res.status(500).send({error: e})
        console.log(e)
    }

}


exports.Habilitar_Usuarios = async (req, res) => {

    try {
        const {params: {id}} = req
        const Usuario = await UsuarioSuspendido.findByIdAndDelete(id)
        emailSend(Usuario)
        res.status(201).send({message: 'Operacion Exitosa'})

    } catch (e) {
        res.status(500).send({error: e})
    }
}


