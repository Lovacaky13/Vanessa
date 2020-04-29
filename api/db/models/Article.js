const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    imageGallery: Array,
    name: String,
    nameGallery: String,
    createDate: {
        type: Date,
        defaut: new Date()
    },
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article