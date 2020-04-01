 // 
 /**
  * Controller d'enregistrement des utilisateurs
  * 
  */
 const User = require('../db/models/User'),
     path = require('path'),
     fs = require('fs')


 module.exports = {
     userCreate: (req, res) => {

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
                     console.log('email deja utilisé dans la DB');
                     return res.json({
                             message: "Email deja utilisé"
                         }),
                         res.redirect('/')

                 } else {
                     console.log(req.body)
                     res.redirect('/')
                 }
             }
         )
     }
 }