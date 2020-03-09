
 // 
/**
 * page Home
 * 
 */

const Article = require("../../db/models/Article")


module.exports = {
    getArticle: async (req, res) => {
        const dbArticle = await Article.find({}); // Transforme ton Model (consctructeur) en Json
        const affdbarticle =  dbArticle.reverse().slice(0, 3);

         res.render('index', {
            //layout: 'admin',
            dbArticle, affdbarticle                             // Renvoyer la DB dans la page                               
         }) 
      }
}

