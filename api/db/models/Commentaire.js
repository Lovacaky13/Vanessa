const mongoose = require('mongoose');

const CommentaireSchema = new mongoose.Schema({

    content: String,
    username:String,
    lastname: String,
    firstname: String,
    produit_id: String,
    createDate: {
        type: Date,
        defaut: new Date()
    },
})

const Commentaire = mongoose.model('Commentaire', CommentaireSchema)

module.exports = Commentaire