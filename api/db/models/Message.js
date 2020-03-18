const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    message: String,
    email: String,
    createDate: {
        type: Date,
        defaut: new Date()
    },
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message