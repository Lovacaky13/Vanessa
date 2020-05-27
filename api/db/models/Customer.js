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
        tutor: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
            unique: true //l'email ne doit pas etre identique aux autres utilisateurs
        },
        Atelier: {
            type: Array,
        },

        medical: {
            type: String,
        },
        diet: {
            type: String,
        },
        up: {
            type: String,
        },

        other: {
            type: String,
        },
    })


module.exports = mongoose.model('Customer', CustomerSchema)