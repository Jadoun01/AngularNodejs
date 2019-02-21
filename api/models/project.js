const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    testing_type: String,
    sub_project_name: String,
    sub_description: String,
    testing_account_detail: String
});

module.exports = mongoose.model('Project', projectSchema);