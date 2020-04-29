const mongoose = require('mongoose');

const AtelierSchema = new mongoose.Schema({

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

const Atelier = mongoose.model('Atelier', AtelierSchema)

module.exports = Atelier