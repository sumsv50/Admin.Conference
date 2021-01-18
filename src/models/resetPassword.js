const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const ResetPassword = new Schema({
    token: String,
    expries: Date,
    admin_id: ObjectId,
});


// Model name => collection
module.exports = mongoose.model('ResetPassword', ResetPassword, 'reset_password');

