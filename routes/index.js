const express = require('express');
const homeController = require('../controllers/homeController');
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.get('/', homeController.index);
router.get('/panel', authMiddleware.isLogged, mainController.index);
router.get('/login', userController.login);
router.post('/login', userController.loginAction);
router.get('/register', userController.register);
router.post('/register', userController.registerAction);
router.get('/logout', userController.logoutAction);
router.get('/confirm/:token', userController.confirmAction);
router.post('/event', eventController.addEvent);

module.exports = router;