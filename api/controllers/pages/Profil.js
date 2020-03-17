// 
/**
 * affiche, modifie compte utilisateurs + mot de passe
 * 
 */



const User = require("../../db/models/User")

module.exports = {
    get: async(req, res) => {
        const
            sess = req.session,
            dbUserID = await User.findById(sess.userId),
            emailProfile = await req.body.email

        console.log(dbUserID);

        if (!req.session) {
            res.redirect('/')
        } else if (req.session) {
            User.findOne({ emailProfile },
                (error, user) => {
                    if (!user) console.log('1')
                })
            res.render("Profil", {
                sess,
                dbUserID
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

    updatemdp: async(req, res) => {

        const sess = req.session,
            dbUserID = await User.findById(sess.userId)

        console.log(1)

        if (req.body.password === req.body.password) {
            if (req.body.password2 === req.body.password2) {
                User.updateOne( //nom du model.module

                    dbUserID, {
                        password: req.body.password,

                    },

                    (err) => {
                        if (!err) {
                            res.redirect('back')
                        } else {
                            res.send(err)
                        }
                    }
                )
            } else {
                console.log('error password')
            }
        }
    },
}