const express = require('express');
const homeController = require('../controllers/homeController');
const mainController = require('../controllers/mainController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

const router = express.Router();
router.get('/', homeController.index);
router.get('/painel', mainController.index);
router.get('/login', loginController.index);
router.post('/login', loginController.loginAction);
router.get('/registro', registerController.index);
router.post('/registro', registerController.registerAction);

module.exports = router;