 // 
 /**
  * Controller d'enregistrement des clients
  * 
  */

 const Customer = require('../db/models/Customer')

 module.exports = {
     createCustomer: async(req, res) => {
         const dbCustomer = await Customer.find({})

         Customer.create({
                 lastname: req.body.lastname,
                 firstname: req.body.firstname,
                 adress: req.body.adress,
                 zip: req.body.zip,
                 city: req.body.city,
                 tutor: req.body.tutor,
                 phone: req.body.phone,
                 email: req.body.email,
                 medical: req.body.medical,
                 diet: req.body.diet,
                 up: req.body.up,
                 cooked: req.body.cooked,
                 aesthetic: req.body.aesthetic,
                 cardGame: req.body.cardGame,
                 game: req.body.game,
                 walk: req.body.walk,
                 gardening: req.body.gardening,
                 sing: req.body.sing,
                 manual: req.body.manual,
                 memory: req.body.memory,
                 gym: req.body.gym,
                 mediaLibrary: req.body.mediaLibrary,
                 other: req.body.other,


             },

             (error, Customer) => {
                 if (error) {
                     console.log(error)
                     res.redirect('/')

                 } else {
                     console.log("Fiche Client créée")
                     res.redirect('back')
                 }
             })
     }
 }