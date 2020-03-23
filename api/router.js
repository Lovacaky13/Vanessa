/*
 * Import
 *********/
const express = require('express'),
    router = express.Router(),
    upload = require('./config/multer') // image

/* Import Controller
 *******************/
const HomePage = require('./controllers/pages/HomePage'),
    ArticleCrud = require('./controllers/pages/ArticleCrud'),
    RegisterControllers = require('./controllers/RegisterControllers'),
    Admin = require('./controllers/pages/Admin'),
    LoginControllers = require('./controllers/LoginControllers'),
    Profil = require('./controllers/pages/Profil'),
    Contact = require('./controllers/pages/Contact'),
    Agenda = require('./controllers/pages/Agenda'),
    Calcul = require('./controllers/pages/Calcul'),
    InfoAsg = require('./controllers/pages/infoAsg'),
    ArticleSingle = require('./controllers/pages/ArticleSingle')

/* Import middlewares
 *******************/
// const auth = require('./middleware/auth'),
//     isAdmin = require('./middleware/isAdmin')


/*
 * Controllers
 *************/

//  Controller Page
router.route('/')
    .get(HomePage.getArticle)

router.route('/Agenda')
    .get(Agenda.get)
router.route('/Calcul')
    .get(Calcul.get)
router.route('/InfoAsg')
    .get(InfoAsg.get)

// ******************* Page Admin CRUD User s'identifier modifier supprimer utilisateur *********************
router.route('/User')
    .post(RegisterControllers.userCreate)
router.route('/admin')
    .get(Admin.get)
router.route('/adminUser/:id')
    .put(Admin.updateUser)
    .delete(Admin.deleteUser)

// ******************* se loguer User  (express/session) *********************

router.route('/register') //router.route('/page dans laquelle on fait le post)
    .post(LoginControllers.login) // .post(methode)(nom du controllers.nom du post donné)
router.route('/logout')
    .get(LoginControllers.logout)

// ******************* CRUD Article*********************
router.route('/Article')
    .get(ArticleCrud.getArticle)
    .post(upload.single('image'), ArticleCrud.createArticle)

router.route('/ArticleSingle/:id')
    .delete(ArticleSingle.deleteOneArticle)
    .get(ArticleSingle.getArticle)
    .put(upload.single('image'), ArticleSingle.updateArticle)


// ******************* Commentaire*********************  
router.route('/comment/:id')
    .post(ArticleSingle.addCom)
    .delete(ArticleSingle.DelCom)

// ******************* Mon Compte*********************  

router.route('/Profil/:id')
    .get(Profil.get)
    .put(Profil.updateUser)

// ******************* Modif Password *********************

router.route('/updatePassword/:id')
    .put(Profil.updatePassword)

// ******************* Message*********************  
router.route('/Contact')
    .get(Contact.get)
    .post(Contact.addMessage)

router.route('/Contact/:id')
    .delete(Contact.delMessage)
    .put(Contact.put)


module.exports = router