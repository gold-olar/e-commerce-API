const Product = require('../models/Product');
const User = require('../models/User');
const BaseController = require('./base.ctrl');


class ProductController extends BaseController {

    async addProduct(req, res) {
        let { _id, role } = req.user;
        super.checkReqBody(req);

        if (role === "admin") {
            try {
                const { name, description, price, quantityAvailable, category, image } = req.body;
                const productParams = { name, description, price, quantityAvailable, category }

                // Upload Image of product to Cloudinary and add image url to db;

                const newProduct = new Product(productParams);
                const savedProduct = await newProduct.save();
                return super.sendSuccess(res, savedProduct);
            } catch (err) {
                return super.sendError(res, err, err.message, err.status);
            }
        }

        return super.sendError(res, null, "Only Admins are authorized to add Products to this store", 400);
    }

    async getAllProducts(req, res) {
        try {
            const products = await Product.find({});;
            return super.sendSuccess(res, products, 'Successful');
        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }

  

    async getSingleProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findOne({ _id: productId });
            if (!product) {
                return super.sendError(res, null, 'Product not found', 404);
            }

            return super.sendSuccess(res, product, 'Successful');
        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }

    async getProductsByCategory(req, res) {
        const category = req.params.category;

        try {
            const products = await Product.find({ category });
            if (!products) {
                return super.sendError(res, null, 'No products in this category');
            }
            return super.sendSuccess(res, products, 'Successful');
        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }
}

module.exports = new ProductController();