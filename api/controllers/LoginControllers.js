 // 
 /**
  * Controller pour se loguer
  * 
  */
 const User = require('../db/models/User'),
     bcrypt = require('bcrypt'),
     nodemailerKeys = require('../config/keys')


 module.exports = {

     login: async(req, res, next) => {
         const {
             email,
             password
         } = req.body;
         cookieUser = await User.findOne({
             email: req.body.email
         })

         if (cookieUser === null) {
             console.log('cookieUser null')

             return res.json({
                     message: "Email ou mot de passe incorrect."
                 }),
                 res.end("error Email ou mot de passe incorrect")

         } else if (cookieUser === !null) {
             check = cookieUser.cookieNotAccept
         }
         next

         check = cookieUser.cookieNotAccept

         if (check === false) {
             console.log('2')

             User.findOne({
                 email
             }, (error, user) => {

                 if (user) {

                     bcrypt.compare(password, user.password, (error, same) => {

                         if (same) {
                             req.session.lastname = user.lastname
                             req.session.firstname = user.firstname
                             req.session.lastname = user.lastname
                             req.session.userId = user._id
                             req.session.email = user.email
                             req.session.status = user.status
                             req.session.isAdmin = user.isAdmin
                             req.session.isVerified = user.isVerified
                             req.session.isBan = user.isBan
                             req.session.cookieNotAccept = user.cookieNotAccept
                             res.cookie('cookie', '', {
                                     domain: nodemailerKeys.nodemailerKeys.url,
                                     path: '/',
                                     maxAge: 86400000
                                 }),
                                 console.log(user._id)
                             res.redirect('/')

                         } else {
                             return res.json({
                                     message: "Email ou mot de passe incorrect."
                                 }),
                                 console.log(req.body),
                                 console.log('Email ou mot de passe incorrect')
                         }
                     })
                 } else {
                     console.log('user pas dans la DB');
                     return res.json({
                             message: "Email ou mot de passe incorrect."
                         }),
                         console.log(req.body)
                 }
             })

         } else if (check === true) {

             console.log('3')

             User.findOne({
                 email
             }, (error, user) => {

                 if (user) {

                     bcrypt.compare(password, user.password, (error, same) => {

                         if (same) {
                             req.session.lastname = user.lastname
                             req.session.firstname = user.firstname
                             req.session.lastname = user.lastname
                             req.session.userId = user._id
                             req.session.email = user.email
                             req.session.status = user.status
                             req.session.isAdmin = user.isAdmin
                             req.session.isVerified = user.isVerified
                             req.session.isBan = user.isBan
                             req.session.cookieNotAccept = user.cookieNotAccept
                             console.log(user._id)
                             res.redirect('/')

                         } else {
                             return res.json({
                                     message: "Email ou mot de passe incorrect."
                                 }),
                                 console.log(req.body)
                         }

                     })
                 } else {
                     console.log('user pas dans la DB');
                     return res.json({
                             message: "Email ou mot de passe incorrect."
                         }),
                         console.log(req.body)
                 }
             })
         }

     },

     logout: (req, res) => {
         req.session.destroy(() => {
             res.clearCookie(`Session`)
             res.clearCookie(`cookie`)
             res.redirect('/')
         })
         console.log('logout')
     }
 }