
 // 
/**
 * CRUD article
 * 
 */


const Article = require("../../db/models/Article"),
    path = require('path'),
    fs = require('fs')

module.exports = {

    getArticle: async (req, res) => {
        const   dbArticle = await Article.find({}) // Transforme ton Model (consctructeur) en Json
 
        res.render('Article', {
            dbArticle          // Renvoyer la DB dans la page                               
        })
    },

    createArticle: async (req, res) => {
        const dbArticle = await Article.find({})

        if (!req.file) {
            console.log('pas de req.file')
            res.redirect('back')

        } else if (req.file) {
            Article.create({                                  
                title: req.body.title,
                image: `/assets/images/${req.file.filename}`,
                name: req.file.filename,
                content: req.body.content,
                createDate: Date.now()

            })
            res.redirect('back')

        } else {
            res.redirect('back')

        }
    }    
}