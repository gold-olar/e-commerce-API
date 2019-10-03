const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName : {
      type: String,
      required: true,
    },
    lastName : {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
      type: String,
      default: 'https://res.cloudinary.com/goldolar/image/upload/v1570075131/user.png'
    },
    date_registered: {
      type: Date,
      default: Date.now(),
    }
});

userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err)
            return err;

        user.password = hash;
        next();
    });
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
