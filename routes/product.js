const { Router } = require('express');
const router = Router();
const productCtrl = require('../controllers/product.ctrl');


router.post('/addProduct', productCtrl.addProduct);





module.exports = router;
