// 
/**
 * CRUD article
 * 
 */

const Article = require("../../db/models/Article"),
    path = require('path'),
    fs = require('fs'),
    Message = require('../../db/models/Message')

module.exports = {

    getArticle: async(req, res) => {
        const dbArticle = await Article.find({}), // Transforme ton Model (consctructeur) en Json
            dbMessage = await Message.find({}),
            sess = req.session
        res.render('Article', {
            dbArticle, // Renvoyer la DB dans la page     
            sess,
            dbMessage
        })
    },

    createArticle: async(req, res) => {
        const dbArticle = await Article.find({})

        if (!req.file) {
            console.log('pas de req.file')
            res.redirect('back')

        } else if (req.file) {
            Article.create({
                title: req.body.title,
                image: `/assets/images/${req.file.filename}`,
                imageGallery: `/assets/imageGallerys/${req.files.filename}`,
                name: req.file.filename,
                nameGallery: req.files.filename,
                content: req.body.content,
                createDate: Date.now()

            })
            res.redirect('back')

        } else {
            res.redirect('back')

        }
    }
}