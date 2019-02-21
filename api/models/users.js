const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userType: {type: String, required: true },
    userName: {type: String, required: true },
    email: {type: String, required: true },
    mobileNo: {type: Number, required: true},
    password: {type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);