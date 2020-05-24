const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

//Antes do get
router.use(AuthController.check_token);
router.get('/user', AuthController.user_date);

module.exports = router;