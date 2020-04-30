const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    UserSchema = new mongoose.Schema({

        status: {
            type: String,
            default: 'user'
        },
        lastname: {
            type: String,

        },
        firstname: {
            type: String,
            required: true
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
        password: {
            type: String,

        },
        isAdmin: {
            type: Boolean,
        },
        isBan: {
            type: Boolean,
        },
        isVerified: {
            type: Boolean,
        },
        cookieNotAccept: {
            type: Boolean,
        },
    })

// crypter le mot de passe
UserSchema.pre('save', function(next) {

    const user = this //prends le mot de passe

    bcrypt.hash(user.password, 10, (error, encrypted) => { //crypte le (! il faut installer bcrypt : npm i bcrypt)
        user.password = encrypted
        next() //et ensuite continue
    })
})

module.exports = mongoose.model('User', UserSchema)