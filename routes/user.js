const { Router } = require('express');
const router = Router();
const userCtrl = require('../controllers/user.ctrl');


router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);




module.exports = router;
