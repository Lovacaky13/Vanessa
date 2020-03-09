
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
        const dbArticle = await Article.find({}) // Transforme ton Model (consctructeur) en Json

        res.render('Article', {
            dbArticle // Renvoyer la DB dans la page                               
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
                createDate: Date.now()

            })
            res.redirect('back')

        } else {
            res.redirect('back')

        }
    },
 
   
    updateArticle: async (req, res) => {
       const dbArticle = await Article.findById(req.params.id),
             query = { _id: req.params.id }
             pathImg = path.resolve("public/images/" + dbArticle.name)

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

    deleteOneArticle: async (req, res) => {
        const   dbArticle = await Article.findById(req.params.id),
                query = { _id: req.params.id },
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
                                res.redirect('back')
                            }
                        })
                } else {
                    res.send(err)
                }
            })
    },
}