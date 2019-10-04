const { Router } = require('express');
const router = Router();
const productCtrl = require('../controllers/product.ctrl');
const auth = require('../services/auth');


router.post('/addProduct', auth.authenticateUser, productCtrl.addProduct);

router.get('/single/:id', productCtrl.getSingleProductById);

router.get('/:category', productCtrl.getProductsByCategory);

router.get('/getAllProducts', productCtrl.getAllProducts);




module.exports = router;
