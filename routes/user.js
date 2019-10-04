const { Router } = require('express');
const router = Router();
const userCtrl = require('../controllers/user.ctrl');
const auth = require('../services/auth');


router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/getAllUsers', auth.authenticateUser, userCtrl.getAllUsers )

module.exports = router;
