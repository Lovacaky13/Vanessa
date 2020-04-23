 // 
 /**
  * Controller d'enregistrement des utilisateurs
  * 
  */
 //coucou
 const User = require('../db/models/User'),
     path = require('path'),
     fs = require('fs'),
     nodemailer = require('nodemailer'),
     nodemailerKeys = require('../config/keys')

 transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     service: 'gmail',
     port: '587',
     auth: {
         user: nodemailerKeys.user,
         pass: nodemailerKeys.pass
     }
 })

 var rand, mailOptions, host, link;


 module.exports = {

     userCreate: async(req, res) => {
         const handshakeEmail = await User.findOne({
                 email: req.body.email
             }),
             handshakePassword = (req.body.password === req.body.passConf),
             rand = Math.floor((Math.random() * 100) + 54),
             host = nodemailerKeys.url,
             link = "http://www.vanessa-binet-asg.fr/SendMail/" + rand

         mailOptions = {
             from: nodemailerKeys.user,
             to: req.body.email,
             subject: "vérification de votre email",
             rand: rand,
             html: "Bonjour.<br> Merci de cliquer sur le lien ci-dessous pour verifier votre email : <br><a href=" + link + ">Cliquer ici pour pour verifier votre email</a>"
         };

         console.log(req.body);
         console.log('link')
         console.log(link)
         console.log('host')
         console.log(host)
         console.log('mailOptions');
         console.log(mailOptions);
         console.log('handshakeEmail');
         console.log(handshakeEmail);

         if (!handshakePassword) {
             return res.json({
                     message: "mot passe different"
                 }),
                 res.end("error password")
         } else if (!handshakeEmail) {
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
                     cookieNotAccept: true,
                 },

                 (error, user) => {
                     if (error) {
                         console.log(error)
                         res.redirect('/')

                     } else {
                         transporter.sendMail(mailOptions, (err, res, next) => {
                             if (err) {
                                 console.log(err)
                                 res.end("error")
                             } else {
                                 console.log("Message Envoyé")
                                 next()
                             }
                         })
                     }
                 })
         } else {
             return res.json({
                     message: "Email deja utilisé"
                 }),
                 console.log('user dans la db ')
         }
         res.redirect('/')
     },

     verifMail: async(req, res) => {

         const handshakeEmail = await User.findOne({
                 email: mailOptions.to
             }),
             host = req.get('host')

         console.log({
             handshakeEmail
         })
         console.log('handshake email :')
         console.log(handshakeEmail)
         console.log('req protocol :')
         console.log(req.protocol + "://" + nodemailerKeys.url)
         console.log('host :')
         console.log("http://" + host)
         console.log(req.get('host'))


         if (!handshakeEmail) {
             res.redirect('/')
         } else {
             if ((req.protocol + "://" + nodemailerKeys.url) == ("http://" + nodemailerKeys.url)) {
                 console.log("Domain is matched. Information is from Authentic email")

                 if (req.params.id == mailOptions.rand) {

                     User.updateOne(
                         handshakeEmail, {
                             isVerified: true,
                         },
                         (err) => {
                             if (err) {
                                 console.log(err)
                             } else {
                                 console.log("email is verified")
                                 res.render('SendMail', {
                                     handshakeEmail
                                 })
                             }
                         }
                     )

                 } else {
                     console.log("email is not verified")
                     res.end("<h1>Bad Request</h1>")
                 }
             } else {
                 res.redirect('/')
             }
         }
     }
 }
