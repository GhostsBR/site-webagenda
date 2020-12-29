const express = require('express');
const homeController = require('../controllers/homeController');
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');

const router = express.Router();
router.get('/', homeController.index);
router.get('/painel', mainController.index);
router.get('/login', userController.login);
router.post('/login', userController.loginAction);
router.get('/register', userController.register);
router.post('/register', userController.registerAction);

module.exports = router;