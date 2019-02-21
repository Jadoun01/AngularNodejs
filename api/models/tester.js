const mongoose = require('mongoose');

const testerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    steps: String,
    expected: String,
    existing: String,
    comment: String,
    screenshot: String
});

module.exports = mongoose.model('Tester', testerSchema);