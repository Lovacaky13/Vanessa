/*
 * Import
 *********/
const express = require('express'),
      router = express.Router(),
      upload  = require('./config/multer') // image
      


/* Import Controller
 *******************/
const   HomePage = require('./controllers/pages/HomePage'),
        ArticleCrud = require('./controllers/pages/ArticleCrud'),
        RegisterControllers = require('./controllers/RegisterControllers'),
        admin = require('./controllers/pages/Admin'),
        LoginControllers = require('./controllers/LoginControllers'),
        Profil = require('./controllers/pages/Profil'),
        Contact = require('./controllers/pages/Contact'),
        Agenda = require('./controllers/pages/Agenda')
/*
 * Controllers
 *************/

//  Controller Page
router.route('/')
    .get(HomePage.getArticle)

router.route('/Profil')
    .get(Profil.get)  

router.route('/Contact')
    .get(Contact.get)  

router.route('/Agenda')
    .get(Agenda.get)  
  


// ******************* CRUD User s'identifier modifier supprimer utilisateur *********************
router.route('/User')
    .post(RegisterControllers.userCreate)        
router.route('/admin')
    .get(admin.getUser)
router.route('/adminUser/:id')
    .put(admin.updateUser)
    .delete(admin.deleteUser)

// ******************* se loguer User  (express/session) *********************

router.route('/register')                                  //router.route('/page dans laquelle on fait le post)
    .post(LoginControllers.login)                          // .post(methode)(nom du controllers.nom du post donné)
router.route('/logout')
    .get(LoginControllers.logout)
      
// ******************* CRUD Article*********************
router.route('/Article')
    .get(ArticleCrud.getArticle)
    .post(upload.single('image'), ArticleCrud.createArticle)

router.route('/Article/:id')
    .delete(ArticleCrud.deleteOneArticle)
    .put(upload.single('image'), ArticleCrud.updateArticle)

module.exports = router