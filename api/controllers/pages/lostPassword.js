const nodemailer = require('nodemailer'),
    User = require('../../db/models/User'),
    bcrypt = require('bcrypt'),
nodemailerKeys = require('../../config/keys'),

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

    get: async(req, res) => {

        res.render('lostPassword')
    },

    updatePassword: async(req, res) => {
        const sess = req.session,
            handshakeEmail = await User.findById(req.params.id)
        query = {
            _id: req.params.id
        }
        console.log('1')
        console.log('update Password Profile')
        console.log(req.body)
        console.log(handshakeEmail)

        if (!handshakeEmail) {
            console.log('handshake Err')
            console.log('2.1')
            res.redirect('/')

        } else if (handshakeEmail) {
            console.log('handshake OK')
            console.log('2.2')
            User.findOne(query, (error, user) => {
                if (!user) {
                    return res.redirect('/')
                } else if (user) {
                    console.log('User OK et handshake OK');

                    const user = this
                    bcrypt.hash(req.body.newPassword, 10, (err, encrypted) => {
                        User.updateOne(query, {
                                password: encrypted
                            },
                            (err) => {
                                if (err) res.send(err)
                                else console.log('Password Update + hash ok'),
                                    res.redirect('/')
                            })
                    })
                }
            })
        } else {
            console.log('error update password profile')
        }
    },

    sendVerif: (req, res) => {
        rand = Math.floor((Math.random() * 100) + 54)
        host = nodemailerKeys.url
        link = "http://" + nodemailerKeys.url + "/lostPassword/" + rand

        console.log('req.body')
        console.log(req.body)
        console.log('link')
        console.log(link)
        console.log('host')
        console.log(host)

        mailOptions = {
            from: nodemailerKeys.url,
            to: req.body.email,
            subject: "Merci de modifier votre mot de passe",
            rand: rand,
            html: "Bonjour.<br> Merci de cliquer sur le lien ci-dessous pour modifier votre mot de passe : <br><a href=" + link + ">Cliquer ici pour modifier votre mot de passe</a>"
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

        const handshakeEmail = await User.findOne({
            email: mailOptions.to
        })

        console.log({
            handshakeEmail
        })
        console.log('handshake email')
        console.log(handshakeEmail)
        console.log(req.protocol + "://" + host)
        console.log('Page verif' + mailOptions)
        console.log(req.session)

        if (!handshakeEmail) {
            res.redirect('/')
        } else {
            if ((req.protocol + "://" + host) == ("http://" + host)) {
                console.log("Domain is matched. Information is from Authentic email")
                if (req.params.id == mailOptions.rand) {
                    console.log("email is verified")
                    res.render('lostPassword', {
                        handshakeEmail
                    })
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
