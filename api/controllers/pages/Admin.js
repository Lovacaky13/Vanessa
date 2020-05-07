// 
/**
 * affiche, modifie et supprime utilisateurs
 * 
 */
const User = require("../../db/models/User"),
    Article = require("../../db/models/Article"),
    path = require('path'),
    Message = require('../../db/models/Message'),
    Atelier = require("../../db/models/Atelier"),
    Customer = require("../../db/models/Customer")


module.exports = {
    get: async(req, res) => {
        const dbUser = await User.find({}),
            dbArticle = await Article.find({}),
            dbAtelier = await Atelier.find({}),
            dbCustomer = await Customer.find({}),
            sess = req.session,
            dbMessage = await Message.find({}),
            dbMessageChecked = await Message.find({
                view: true
            }),
            dbMessageNotChecked = await Message.find({
                view: false
            })
        res.render('admin', {
            dbUser,
            dbArticle,
            dbAtelier,
            dbCustomer,
            sess,
            dbMessage,
            dbMessageChecked,
            dbMessageNotChecked,
        })
    },

    updateUser: async(req, res) => {
        const query = {
            _id: req.params.id
        }

        User.updateOne( //nom du model.module
            query, {
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

    deleteUser: (req, res) => {
        User.deleteOne({
                _id: req.params.id
            },

            (err) => {
                if (!err) {
                    res.redirect('/admin')
                } else {
                    res.send(console.log(err))
                }
            })
    },

    updateCustomer: async(req, res) => {
        const query = {
            _id: req.params.id
        }

        Customer.updateOne(
            query, {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                adress: req.body.adress,
                zip: req.body.zip,
                city: req.body.city,
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

    deleteCustomer: (req, res) => {
        Customer.deleteOne({
                _id: req.params.id
            },

            (err) => {
                if (!err) {
                    console.log('fiche client supprimée')
                    res.redirect('/admin')
                } else {
                    res.send(console.log(err))
                }
            })
    },
}