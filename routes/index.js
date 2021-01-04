const express = require('express');
const homeController = require('../controllers/homeController');
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.get('/', homeController.index);
router.get('/painel', authMiddleware.isLogged, mainController.index);
router.get('/entrar', (req, res) => {res.redirect('/login')})
router.get('/login', userController.login);
router.post('/login', userController.loginAction);
router.get('/registro', (req, res) => {res.redirect('/register')})
router.get('/register', userController.register);
router.post('/register', userController.registerAction);
router.get('/logout', userController.logoutAction);

module.exports = router;