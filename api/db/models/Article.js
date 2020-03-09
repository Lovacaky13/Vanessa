const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({

    title: String,
    image: String,
    name: String,
    createDate: {
        type: Date,
        defaut: new Date()
    },
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article