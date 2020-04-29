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
            dbMessageNotChecked = await Message.find({ view: false }),
            sess = req.session
        res.render('Article', {
            dbArticle, // Renvoyer la DB dans la page     
            sess,
            dbMessageNotChecked
        })
    },

    createArticle: async(req, res) => {
        const dbArticle = await Article.find({}),
            files = req.files.imageGallery,
            image = req.files.image[0].filename,
            arrayFiles = []
        console.log('1')
        console.log(req.body)
        console.log('2')
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
        console.log('3')
        console.log(arrayFiles)
        if (!req.files) {
            console.log('pas de req.file')
            res.redirect('back')
        } else if (req.files) {
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
            res.redirect('back')
        }
    }
}