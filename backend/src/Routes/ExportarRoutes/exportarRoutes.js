const express = require('express');
const router = express.Router();
const {ListarTablas, Exportar_tablas} = require('../../Controllers/Exportar/exportar')
const {userAuth, checkRole} = require('../../Utils/Auth');

router.route('/listardatos').get(checkRole, ListarTablas)
router.route('/exportar').post(Exportar_tablas)

module.exports = router;
