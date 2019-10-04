const Category = require('../models/Category');
const BaseController = require('./base.ctrl');


class CategoryController extends BaseController {
    constructor() {
        super()
    }

    async createCategory (req, res) {
        let  { name } = req.body;
        name = name.trim();
        
        try {
            const categoryParams = {name};
            const newCategory = new Category(categoryParams);
            const saveCategory = await newCategory.save();

            return super.sendSuccess(res, newCategory);
        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }


    async getAllCategories (req, res) {
        try{
            const allCategories = Category.find();
            return super.sendSuccess(res, allCategories);

        } catch (err){
            return super.sendError(res, err, err.message, err.status);

        }
    }

}



module.exports = new CategoryController();
