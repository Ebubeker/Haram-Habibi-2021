const { constants } = require('buffer');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Email = mongoose.model('EmailColl', emailSchema);

module.exports = Email;