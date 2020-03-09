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
            ...req.body,
                   lastname: req.body.lastname,
                   firstname: req.body.firstname,
                   adress: req.body.adress,
                   zip:req.body.zip,
                   city:req.body.city,
                   email:req.body.email,
                   password: req.body.password,
                   status:'user',
                   isAdmin: false,
                   isBan:false,
                   isVerified:false,
                                 
                }, (err, user) => {
                    if (!err) res.redirect('/')
                    else console.log(err);
                   
                })
        
            }
        }
 //  User.create(

         //      ...req.body, (error, User) => {

         //          if (error) { //si erreur de type pas de nom, ou mot de passe...

         //              const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

         //              req.flash('registerError', registerError)
         //              req.flash('data', req.body) //recupere les données saisies par l'utilisateur

         //              return res.redirect('index', {
         //                 success: req.flash('success')
         //              }) //redirige vers ...
         //          }

         //         //  res.redirect('/')
         //      }
         //  )

