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
            dbMessageNotChecked = await Message.find({ view: false })

        res.render('ArticleSingle', {
            dbArticle, // Renvoyer la DB dans la page       
            sess,
            dbCom,
            dbMessageNotChecked
        })
    },

    updateArticle: async(req, res) => {
        const dbArticle = await Article.findById(req.params.id),
            query = {
                _id: req.params.id
            },
            pathImg = path.resolve("public/images/" + dbArticle.name),
            files = dbArticle.imageGallery
        console.log(1)
        console.log(dbArticle.name)

        Article.updateOne(query, {
                title: req.body.title,
                content: req.body.content
            },
            (err) => {
                if (err) console.log(err)
                else res.redirect('back')
                console.log(2)
            })

        if (files && pathImg) {
            (err) => {
                console.log(3)
                if (!err) {
                    for (let i = 0; i < files.length; i++) {
                        const dbFilename = files[i].filename

                        if (files) {
                            (error, post) => {
                                fs.unlink(path.resolve('public/images/' + files[i].name),
                                    (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('image seule modifiée')
                                            res.redirect('back')
                                        }
                                    })
                            }
                        }
                        if (pathImg) {
                            (error, post) => {
                                console.log(3)
                                fs.unlink(pathImg,
                                    (err) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('imageGallery modifiée')
                                            res.redirect('back')
                                        }
                                    })
                            }
                        }
                    }
                } else next()
                return res.redirect('back')
            }
        }
    },

    deleteOneArticle: async(req, res, next) => {
        const dbArticle = await Article.findById(req.params.id),
            dbCom = await Com.findById(req.params.id),
            query = { _id: req.params.id },
            queryCom = { produit_id: req.params.id },
            pathImg = path.resolve("public/images/" + dbArticle.name),
            files = dbArticle.imageGallery
        console.log(dbArticle)
        console.log(dbCom)
        if (files && pathImg) {
            Article.deleteOne(query,
                (err) => {
                    if (!err) {

                        for (let i = 0; i < files.length; i++) {
                            const dbFilename = files[i].filename
                            if (files) {
                                fs.unlink(path.resolve('public/images/' + files[i].name),
                                    (err) => {
                                        if (err) console.log(err)
                                        else console.log('imageGallery Supprimée') && next()
                                    })
                            }
                        }
                        if (pathImg) {
                            fs.unlink(pathImg,
                                (err) => {
                                    if (err) console.log(err)
                                    else console.log('imageSeule Supprimée') && next()
                                })
                        }
                        if (queryCom) {
                            Com.deleteMany(queryCom,
                                (err) => {
                                    if (err) console.log(err)
                                    else console.log('Commentaire Supprimé') && next()
                                }
                            )
                        } else next()
                        return res.redirect('/')
                    } else {
                        console.log('Erreur de suppression Article')
                        return res.send(err)
                    }

                }
            )
        }
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