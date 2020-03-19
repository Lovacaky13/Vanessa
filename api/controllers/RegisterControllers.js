 // 
 /**
  * Controller d'enregistrement des utilisateurs
  * 
  */
 const User = require('../db/models/User'),
     path = require('path'),
     fs = require('fs'),
     connectFlash = require('connect-flash')

 module.exports = {
     userCreate: (req, res) => {

         User.create(
             req.body, (error, user) => {

                 if (error) { //si erreur de type pas de nom, ou mot de passe

                     const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                     req.flash('registerError', registerError)
                     req.flash('data', req.body) //recupere les données saisies par l'utilisateur

                     return res.redirect('/') //redirige vers ...
                 }

                 res.redirect('/')
             }
         )
     }
 }