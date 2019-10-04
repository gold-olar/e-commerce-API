
const User = require('../models/User');
const BaseController = require('./base.ctrl');
const imageUploader = require('./imageUploader');


class UserController extends BaseController {
    constructor() {
        super()
    }

    async register(req, res) {
        super.checkReqBody(req);
        try {
            const { firstName, lastName, email, password, image  } = req.body;
            const existingUser = await User.findOne({ email });
            if ( existingUser )
                return super.sendError(res, null, 'A user already exists with the same email', 400);

            // const imageUrl = await imageUploader.upload(image);

            let role;
            const existingAdmin = await User.findOne({role: "admin"});
            if ( existingAdmin ) {
              role = "user"
            }else{
              role = "admin"
            }

            const userParams = { firstName, lastName, email, password, role };
            const newUser = new User(userParams);


            let savedUser = await newUser.save();
            let tokenData = { userId: savedUser._id, role: savedUser.role }
            let token = super.generateToken(tokenData);
            savedUser = { token, user: savedUser }
            return super.sendSuccess(res, savedUser);
        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }

    async login(req, res) {
        super.checkReqBody(req);
        try {
            const { email, password } = req.body;
            let userInDb = await User.findOne({ email });
            if (userInDb) {
                const isPasswordCorrect = super.comparePassword(password, userInDb.password);
                if (!isPasswordCorrect) {
                    return super.sendError(res, null, 'Password is incorrect', 400);
                }
                let tokenData = { userId: userInDb._id, role: userInDb.role };

                const token = super.generateToken(tokenData);
                userInDb = { token, user: userInDb }
                return super.sendSuccess(res, userInDb);
            }

            return super.sendError(res, null, 'User not found, Please register.', 400);
        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }

    async getAllUsers (req, res) {
        try {
            const allUsers = await User.find({role: "user"});
            if (allUsers){
                return super.sendSuccess(res, allUsers);
            }
            return super.sendError(res, null, 'You have no users yet', 404);


        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }

}

module.exports = new UserController();
