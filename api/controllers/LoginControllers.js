 // 
 /**
  * Controller pour se loguer
  * 
  */
 const User = require('../db/models/User'),
     bcrypt = require('bcrypt')


 module.exports = {

     login: (req, res) => {
         const {
             email,
             password
         } = req.body;



         User.findOne({
             email
         }, (error, user) => {

             if (user) {

                 bcrypt.compare(password, user.password, (error, same) => {

                     if (same) {
                         req.session.lastname = user.lastname
                         req.session.firstname = user.firstname
                         req.session.firstname = user.firstname
                         req.session.lastname = user.lastname
                         req.session.userId = user._id
                         req.session.email = user.email
                         req.session.status = user.status
                         req.session.isAdmin = user.isAdmin
                         req.session.isVerified = user.isVerified
                         req.session.isBan = user.isBan
                         req.session.isAcheteur = user.isAcheteur
                         console.log(user._id);
                         res.json({ noError: true });
                         res.redirect('back')
                     } else {
                         res.json({ message: "Email ou mot de passe incorrect." });
                         res.redirect('/')
                     }
                 })
             } else {
                 console.log('user pas dans la DB');
                 res.json({ message: "Email ou mot de passe incorrect." });
                 return res.redirect('/')
             }
         })
     },

     logout: (req, res) => {
         req.session.destroy(() => {
             res.clearCookie("biscuit");
             res.redirect('/')
         })
         console.log('logout')
     }
 }