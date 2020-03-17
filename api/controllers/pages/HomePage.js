// 
/**
 * page Home
 * 
 */

const Article = require("../../db/models/Article")


module.exports = {
    getArticle: async(req, res) => {
        const dbArticle = await Article.find({}); // Transforme ton Model (consctructeur) en Json
        affdbarticle = dbArticle.reverse().slice(0, 3);

        sess = req.session,
            res.render('index', {
                //layout: 'admin',
                ArticleReverseLimited: affdbarticle, // Renvoyer la DB dans la page      
                sess,
            })
    }
}