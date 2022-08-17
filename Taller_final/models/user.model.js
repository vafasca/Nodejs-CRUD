const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModelSchema = new Schema({
    userName:{
        type: String,
        required: [true, 'Username is quired'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [10, 'Name must be at most 10 characters long'],
        trim: true,
        unique: [true, 'User already exist']
    },
    userPassword:{
        type: String,
        required: true,
        menlength: [5, 'Name must be at least 5 characters long'],
        maxlength: [20, 'Name must be at most 20 characters long'],
        trim: true
    }

});

const userModel = mongoose.model('User', userModelSchema);
module.exports = userModel;