// lien pour activer module gmail : https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343

const nodemailer = require('nodemailer'),
    User = require('../db/models/User'),


    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        port: '587',
        auth: {
            user: "lovacaky13@gmail.com",
            pass: "17051978"
        }
    })

var rand, mailOptions, host, link;

module.exports = {
    test: (req, res) => {
        const mailOptions = {
            from: 'lovacaky13@gmail.com',
            to: 'lovacaky13@gmail.com',
            subject: 'Félicitation !',
            html: '<h2>111Mon premier mail avec nodemailer, Successfull</h2>'
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('err')
                console.log(err)
            } else {
                console.log(info)
                res.render('index')
            }
        })
    },
    sendVerif: (req, res) => {
        rand = Math.floor((Math.random() * 100) + 54)
        host = req.get('host')
        link = "http://" + req.get('host') + "/verify/" + rand
        mailOptions = {
            from: 'lovacaky13@gmail.com',
            to: 'lovacaky13@gmail.com',
            subject: "Merci de confirmer votre adresse email",
            rand: rand,
            html: "Bonjour.<br> Merci de cliquer sur le lien ci-dessous pour vérifier votre adresse email : <br><a href=" + link + ">Cliquer ici pour vérifier votre email</a>"
        }
        console.log(mailOptions)
        transporter.sendMail(mailOptions, (err, res, next) => {
            if (err) {
                console.log(err)
                res.end("error")
            } else {
                console.log("Message Envoyé")
                next()
            }
        })
        res.render('index')
    },
    verifMail: async(req, res) => {
        const handshakeSession = await User.findById(req.session.userId)
        console.log(handshakeSession)
        console.log(req.protocol + "://" + req.get('host'))
        console.log('Page verif' + mailOptions)
        console.log(req.session)

        if (!handshakeSession) {
            res.redirect('/')
        } else {
            if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
                console.log("Domain is matched. Information is from Authentic email")
                if (req.params.id == mailOptions.rand) {
                    console.log("email is verified")
                    res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")
                } else {
                    console.log("email is not verified")
                    res.end("<h1>Bad Request</h1>")
                }
            } else {
                res.end("<h1>Request is from unknown source")
            }
        }
    }
}