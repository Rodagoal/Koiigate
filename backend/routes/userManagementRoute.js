const express = require('express');
const router = express.Router();
const userManager = require('../controllers/userManagementController.js');

//get para obtener los datos
//post mandar/insertar datos al front
router.post('/newtutor', userManager.ingresaTutor);

router.post('/newadmin', userManager.ingresaAdmin);

router.post('/editatutor', userManager.editaTutor);

router.post('/editaadmin', userManager.editaAdmin);

router.post('/borratutor/:id', userManager.borraTutor);

router.post('/borraadmin/:id', userManager.borraAdmin);

module.exports = router;