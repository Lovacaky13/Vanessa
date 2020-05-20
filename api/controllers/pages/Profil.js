// 
/**
 * affiche, modifie compte utilisateurs + mot de passe
 * 
 */

const User = require("../../db/models/User"),
    path = require('path'),
    bcrypt = require('bcrypt'),
    Message = require('../../db/models/Message')

module.exports = {
    get: async(req, res) => {
        const
            sess = req.session,
            dbUserID = await User.findById(sess.userId),
            emailProfile = await req.body.email,
            dbMessageNotChecked = await Message.find({
                view: false
            })

        console.log(sess);
        if (!req.session) {
            res.redirect('/')
        } else if (req.session) {
            User.findOne({
                    emailProfile
                },
                (error, user) => {
                    if (!user) console.log('1')
                })
            res.render("Profil", {
                sess,
                dbUserID,
                dbMessageNotChecked
            })
        } else {
            res.redirect('/')
        }
    },

    updateUser: async(req, res) => {

        const sess = req.session,
            dbUserID = await User.findById(sess.userId)

        console.log(1)
        User.updateOne( //nom du model.module
            dbUserID, {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
            },
            (err) => {
                if (!err) {
                    res.redirect('back')
                } else {
                    res.send(err)
                }
            }
        )
    },
    updatePassword: async(req, res) => {
        const sess = req.session,
            handshake = (req.body.newPassword === req.body.confNewPassword),
            dbUserID = await User.findById(sess.userId)

        const {
            email,
            password
        } = req.body,
            query = {
                _id: req.params.id
            }

        console.log('update Password Profile')
        console.log(req.body)

        if (!handshake) {

            console.log('password different');

            req.flash('errorsPassword', "Les nouveaux mots de passe ne sont pas identiques")

            res.render('Profil', {
                errorsPassword: req.flash('errorsPassword'),
            })

        } else if (handshake) {
            console.log('handshake OK')
            User.findOne({
                email
            }, (error, user) => {

                if (!user) {
                    return res.redirect('/')
                } else if (user) {
                    console.log('User OK et handshake OK');
                    bcrypt.compare(password, user.password, (error, same) => {
                        if (!same) {

                            console.log('Password Fail');
                            req.flash('errorsPassword', "mot de passe incorrect")

                            res.render('Profil', {
                                errorsPassword: req.flash('errorsPassword'),
                            })


                        } else if (same) {
                            const user = this

                            bcrypt.hash(req.body.newPassword, 10, (err, encrypted) => {
                                User.updateOne(query, {
                                        password: encrypted
                                    },
                                    (err) => {
                                        if (err) res.send(err)
                                        else console.log('Password Update + hash ok'), res.render('Profil', {
                                            dbUserID,
                                            sess
                                        })
                                    })
                            })
                        } else {
                            res.redirect('/')
                        }
                    })
                }
            })
        } else {
            console.log('error update password profile')

        }
    },

    deleteUser: (req, res) => {
        User.deleteOne({
                _id: req.params.id
            },

            (err) => {
                if (!err) {
                    res.redirect('/logout')
                } else {
                    res.send(console.log(err))
                }
            })
    },
}