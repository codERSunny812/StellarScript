const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    ipAddress:{
        type: String,
        
    }
})

//can be called by the document instance(Object)
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, jwt_secret, { expiresIn: '24h' })
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//can be called directly by the usermodel
userSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('user', userSchema)


module.exports = userModel