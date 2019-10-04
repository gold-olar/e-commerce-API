const BaseController = require('../controllers/base.ctrl');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
let jwtSecret = 'secret';


class AuthController extends BaseController {
    constructor() {
        super()
    }


    async authenticateUser(req, res, next) {
        console.log(req.headers.token);
        try {
            if (!req.headers || !req.headers['token']) {
                return super.sendError(res, null, 'Access denied', 401);
            }
            let token = req.headers['token']

            const userId = jwt.verify(token, jwtSecret,(err, authData) => {
                if (err){
                       console.log('verify ERR', err)
                       return err;
                   }
                   return authData.userId;
                });
            
            const user = await User.findOne({ _id : userId });
            if (!user) {
                return super.sendError(res, null, 'Access denied', 401);
            }

            req.user = user;
            next();
        } catch (err) {
            return super.sendError(res, err, err.message, err.status);
        }
    }
}


module.exports = new AuthController();
