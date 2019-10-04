const { Router } = require('express');
const categoryCtrl = require('../controllers/category.ctrl');
const auth = require('../services/auth');
const router = Router();

router.post('/createCategory', auth.authenticateUser, categoryCtrl.createCategory);



module.exports = router;
