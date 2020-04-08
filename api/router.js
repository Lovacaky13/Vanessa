/*
 * Import
 *********/
const express = require('express'),
    router = express.Router(),
    upload = require('./config/multer'), // image
    uploadAtelier = require('./config/multerAtelier') // image

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
    ArticleSingle = require('./controllers/pages/ArticleSingle'),
    lostPassword = require('./controllers/pages/lostPassword'),
    VerifMail = require('./controllers/pages/VerifMail'),
    SendMail = require('./controllers/pages/SendMail'),
    Atelier = require('./controllers/pages/Atelier'),
    AtelierSingle = require('./controllers/pages/AtelierSingle')

/* Import middlewares
 *******************/
const isAdmin = require('./Middleware/isAdmin'),
    auth = require('./Middleware/auth')

/*
 * Controllers
 *************/

//  Controller Page
router.route('/')
    .get(HomePage.getArticle)
router.route('/Agenda')
    .get(isAdmin, Agenda.get)
router.route('/Calcul')
    .get(Calcul.get)
router.route('/InfoAsg')
    .get(InfoAsg.get)
router.route('/SendMail')
    .get(SendMail.get)
router.route('/VerifMail')
    .get(VerifMail.get)

// ******************* Page Admin CRUD User s'identifier modifier supprimer utilisateur *********************
router.route('/User')
    .post(RegisterControllers.userCreate)
router.route('/admin')
    .get(isAdmin, Admin.get)
router.route('/adminUser/:id')
    .put(isAdmin, Admin.updateUser)
    .delete(isAdmin, Admin.deleteUser)

// ******************* se loguer User  (express/session) *********************

router.route('/login') //router.route('/page dans laquelle on fait le post)
    .post(LoginControllers.login) // .post(methode)(nom du controllers.nom du post donné)
router.route('/logout')
    .get(LoginControllers.logout)

// ******************* CRUD Article*********************
const fields = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'imageGallery', maxCount: 4 }])
router.route('/Article')
    .get(ArticleCrud.getArticle)
    .post(fields, isAdmin, ArticleCrud.createArticle)

router.route('/ArticleSingle/:id')
    .delete(isAdmin, ArticleSingle.deleteOneArticle)
    .get(ArticleSingle.getArticle)
    .put(isAdmin, upload.single('image'), ArticleSingle.updateArticle)

// ******************* CRUD Atelier *********************
const fieldsAtelier = uploadAtelier.fields([{ name: 'image', maxCount: 1 }, { name: 'imageGallery', maxCount: 4 }])
router.route('/Atelier')
    .get(Atelier.getAtelier)
    .post(fieldsAtelier, isAdmin, Atelier.createAtelier)

router.route('/AtelierSingle/:id')
    .delete(isAdmin, AtelierSingle.deleteOneAtelier)
    .get(AtelierSingle.getAtelier)
    .put(isAdmin, uploadAtelier.single('image'), AtelierSingle.updateAtelier)

// ******************* Commentaire*********************  
router.route('/comment/:id')
    .post(ArticleSingle.addCom)
    .delete(isAdmin, ArticleSingle.DelCom)

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
    .delete(isAdmin, Contact.delMessage)
    .put(isAdmin, Contact.put)

// ******************* Nodemailer mot de passe oublié*********************  
router.route('/lostPassword')
    .post(lostPassword.sendVerif)

router.route('/lostPassword/:id')
    .get(lostPassword.verifMail)
    .put(lostPassword.updatePassword)

// ******************* Nodemailer Verif Email*********************  
router.route('/SendMail/:id')
    .get(RegisterControllers.verifMail)

module.exports = router