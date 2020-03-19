// 
/**
 * affiche, modifie et supprime utilisateurs
 * 
 */
const User = require("../../db/models/User"),
    Article = require("../../db/models/Article"),
    path = require('path'),
    Message = require('../../db/models/Message')


module.exports = {
    get: async(req, res) => {
        const dbUser = await User.find({}),
            dbArticle = await Article.find({}),
            sess = req.session,
            dbMessage = await Message.find({}),
            dbMessageChecked = await Message.find({ view: true }),
            dbMessageNotChecked = await Message.find({ view: false })
        res.render('admin', {
            dbUser,
            dbArticle,
            sess,
            dbMessage,
            dbMessageChecked,
            dbMessageNotChecked
        })
    },

    updateUser: async(req, res) => {

        query = {
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
}