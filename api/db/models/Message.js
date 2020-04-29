const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    message: {
        type: String,
        required: [true, 'message est obligatoire']
    },
    email: {
        type: String,
        required: [true, "l'email est obligatoire"]
    },

    subject: String,

    author: String,

    view: {
        type: Boolean,
        defaut: false
    },

    createDate: {
        type: Date,
        defaut: new Date()
    },
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message