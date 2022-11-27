const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//Rutas
//Listado de películas
router.get('/', usersAPIController.list);
//Conteo de registros
router.get('/count', usersAPIController.count);

module.exports = router;