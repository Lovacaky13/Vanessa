const Com = require('../../db/models/Commentaire'),
    Article = require("../../db/models/Article"),
    path = require('path'),
    fs = require('fs'),
    Message = require('../../db/models/Message')

module.exports = {
    getArticle: async(req, res) => {
        const dbArticle = await Article.findById(req.params.id), // Transforme ton Model (consctructeur) en Json
            sess = req.session,
            dbCom = await Com.find({ produit_id: req.params.id }),
            dbMessage = await Message.find({})

        res.render('ArticleSingle', {
            dbArticle, // Renvoyer la DB dans la page       
            sess,
            dbCom,
            dbMessage
        })
    },

    updateArticle: async(req, res) => {
        const dbArticle = await Article.findById(req.params.id),
            query = {
                _id: req.params.id
            }
        pathImg = path.resolve("public/images/" + dbArticle.name)
        console.log(1)
        console.log(dbArticle.name)
        console.log(req.file)

        if (!req.file) {
            if (req.body.title) {
                console.log('edit title (no file)')
                console.log(dbArticle)

                Article.updateOne(query, {
                        title: req.body.title
                    },
                    (err) => {
                        if (err) res.redirect('back')
                        else res.redirect('back')
                    })
            } else {
                res.redirect('/')
            }
        } else {
            Article.updateOne(query, {
                    ...req.body,
                    image: `/assets/images/${req.file.filename}`,
                    name: req.file.filename
                },

                (error, post) => {
                    fs.unlink(pathImg,
                        (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('File Deleted.')
                                res.redirect('back')
                            }
                        })
                })
        }
    },

    deleteOneArticle: async(req, res) => {
        const dbArticle = await Article.findById(req.params.id),
            query = {
                _id: req.params.id
            },

            pathImg = path.resolve("public/images/" + dbArticle.name)

        console.log(dbArticle);
        console.log(query);
        console.log(pathImg);

        Article.deleteOne(query,
            (err) => {
                if (!err) {
                    fs.unlink(pathImg,
                        (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('File Deleted.')
                                res.redirect('/Article')
                            }
                        })
                } else {
                    res.send(err)
                }
            })
    },

    addCom: async(req, res) => {
        console.log('add com');

        Com.create({
            createDate: new Date(),
            produit_id: req.params.id,
            lastname: req.session.lastname,
            firstname: req.session.firstname,
            content: req.body.content,
        })
        res.redirect('back')
    },

    DelCom: async(req, res) => {
        const dbCom = await Com.findById({ _id: req.params.id })
        dbCom.deleteOne({ _id: req.params.id })
        console.log('delete com');

        res.redirect('back')
    }
}