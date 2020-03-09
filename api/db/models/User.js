const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

    // googleId:String,

    // username:String,
   
    status: {
        type: String,
        default: 'user'
    },

    lastname: {
        type: String,
        // required: [true, 'le nom est obligatoire']
    },

    firstname: {
        type: String,
        // required: [true, 'le prénom est obligatoire']
    },

    adress: {
        type: String,
        // required: [true, 'l adresse est obligatoire']
    },

    zip: {
        type: Number,
        // required: [true, 'le code postal est obligatoire']
    },
    city: {
        type: String,
        // required: [true, 'la ville est obligatoire']
    },
    
    email: {
        type: String,
        // required: [true, 'l email est obligatoire'],
        unique: true   //l'email ne doit pas etre identique aux autres utilisateurs
    },
    password: {
        type: String,
        // required: [true, 'mot de passe est obligatoire']
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
    
    BankCard: {
        type: String,
    },

})

// crypter le mot de passe
UserSchema.pre('save', function (next) {

    const user = this                                      //prends le mot de passe

    bcrypt.hash(user.password, 10, (error, encrypted) => {  //crypte le (! il faut installer bcrypt : npm i bcrypt)
        user.password = encrypted
        next()                                                //et ensuite continue
    })
})

module.exports = mongoose.model('User', UserSchema)
