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
            dbMessageNotChecked = await Message.find({
                view: false
            }),
            sess = req.session
        res.render('Article', {
            dbArticle, // Renvoyer la DB dans la page     
            sess,
            dbMessageNotChecked
        })
    },

    createArticle: async(req, res) => {
        const dbArticle = await Article.find({})

        console.log('req.body'),
            console.log(req.body),
            console.log('req.files'),
            console.log(req.files),
            console.log('req.files.imageGallery'),
            console.log(req.files.imageGallery),
            console.log('req.files.image'),
            console.log(req.files.image)

        if (!req.files.imageGallery && !req.files.image) {
            console.log('2')
            console.log('pas de req.file')
            Article.create({
                title: req.body.title,
                content: req.body.content,
                createDate: Date.now()
            })
            res.redirect('back')
        } else
        if (req.files) {

            const files = req.files.imageGallery,
                image = req.files.image[0].filename,
                arrayFiles = []

            console.log('3')
            console.log(image)

            for (let i = 0; i < files.length; i++) {
                const dbFilename = files[i].filename
                if (files) {
                    console.log(files[i].filename)
                    arrayFiles.push({
                        name: files[i].filename,
                        filename: `/assets/images/${files[i].filename}`,
                        orifginalname: files[i].originalname
                    })
                }
            }

            console.log(arrayFiles)

            Article.create({
                title: req.body.title,
                image: `/assets/images/${image}`,
                imageGallery: arrayFiles,
                name: image,
                content: req.body.content,
                createDate: Date.now()
            })
            res.redirect('back')
        } else {
            console.log('3')
            res.redirect('back')
        }
    }
}