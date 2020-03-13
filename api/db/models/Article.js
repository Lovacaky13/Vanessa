const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    image1: String,
    
    name: String,
    createDate: {
        type: Date,
        defaut: new Date()
    },
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article