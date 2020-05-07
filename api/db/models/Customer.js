const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    CustomerSchema = new mongoose.Schema({


        lastname: {
            type: String,

        },
        firstname: {
            type: String,

        },
        adress: {
            type: String,
        },
        zip: {
            type: Number,
        },
        city: {
            type: String,
        },
        email: {
            type: String,
            unique: true //l'email ne doit pas etre identique aux autres utilisateurs
        },

    })


module.exports = mongoose.model('Customer', CustomerSchema)