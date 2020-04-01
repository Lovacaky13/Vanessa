 // 
 /**
  * Controller d'enregistrement des utilisateurs
  * 
  */
 const User = require('../db/models/User'),
     path = require('path'),
     fs = require('fs')


 module.exports = {
     userCreate: async(req, res) => {
         const handshakeEmail = await User.findOne({
             email: req.body.email
         })

         console.log(handshakeEmail);
         console.log(req.body);

         if (!handshakeEmail) {
             console.log('user pas dans la db')

             User.create({
                     lastname: req.body.lastname,
                     firstname: req.body.firstname,
                     adress: req.body.adress,
                     zip: req.body.zip,
                     city: req.body.city,
                     email: req.body.email,
                     password: req.body.password,
                     status: 'user',
                     isAdmin: false,
                     isBan: false,
                     isVerified: false,

                 },

                 (error, user) => {
                     if (error) {
                         console.log(error)
                         res.redirect('/')

                     } else {
                         console.log(req.body)
                         res.redirect('/')
                     }
                 })

         } else {
             return res.json({
                     message: "Email deja utilisé"
                 }),
                 console.log('user dans la db ')
         }

     }
 }