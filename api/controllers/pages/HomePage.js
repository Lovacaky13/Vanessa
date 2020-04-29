// 
/**
 * page Home
 * 
 */

const Article = require("../../db/models/Article"),
    Message = require('../../db/models/Message')


module.exports = {
    getArticle: async(req, res) => {
        const dbArticle = await Article.find({}), // Transforme ton Model (consctructeur) en Json
            affdbarticle = dbArticle.reverse().slice(0, 3),
            dbMessageNotChecked = await Message.find({
                view: false
            }),
            sess = req.session

        res.render('index', {
            //layout: 'admin',
            ArticleReverseLimited: affdbarticle, // Renvoyer la DB dans la page      
            sess,
            dbMessageNotChecked

        })
    },

    get: (req, res) => {
        const CSession = req.cookies.Session,
            CCookie = req.cookies.Cookie

        console.log('Page Home')
        console.log('1')
        console.log(req.cookies)
        console.log('2')
        console.log(CSession)
        console.log('3')
        console.log(CCookie)

        if (!CSession) res.redirect('/')
        else if (CSession && CCookie) {
            console.log('Tout les cookies !')
            res.render('home', {
                cook: CCookie,
                allCookie: 'Tous les cookies, la confiance est parmis nous !',
                idAllCookie: 'loveCookie',
                CSession: 'Vous avez le cookie de la session ',
                CPtiGato: 'et le cookie "ptiGato "',
                CCookie: 'et le cookie "cookie "'
            })

        } else if (CSession || CCookie) {
            if (CPtiGato) {
                console.log('Session')
                res.render('home', {
                    CSession: 'Vous avez le cookie de la session ',
                    CPtiGato: 'et le cookie "ptiGato !"'
                })

            } else if (CCookie) {
                console.log('Session + CCookie')
                res.render('home', {
                    CSession: 'Vous avez le cookie de la session ',
                    CCookie: 'et le cookie "cookie !"'
                })
            } else res.redirect('/')

        } else {
            console.log('Cookie Session Seulement')
            res.render('home', {
                CSession: 'Vous avez le cookie de la session '
            })
        }
    },
    post: (req, res) => {
        console.log('coucou');

    }
}