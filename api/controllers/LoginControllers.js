 // 
 /**
  * Controller pour se loguer
  * 
  */
 const User = require('../db/models/User'),
     bcrypt = require('bcrypt'),
     nodemailerKeys = require('../config/keys')


 module.exports = {

     login: async(req, res) => {
         const {
             email,
             password
         } = req.body;
         cookieNotAccept = await User.findOne({
                 email: req.body.email
             }),
             check = cookieNotAccept.cookieNotAccept

         console.log('cookieNotAccept');
         console.log(cookieNotAccept);
         console.log('check');
         console.log(check);
         console.log('1');
         console.log(req.hostname);


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
                                     domain: req.hostname,
                                     path: '/',
                                     maxAge: 86400000
                                 }),
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

         } else {

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