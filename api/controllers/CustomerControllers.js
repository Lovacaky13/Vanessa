 // 
 /**
  * Controller d'enregistrement des clients
  * 
  */

 const Customer = require('../db/models/Customer')

 module.exports = {
     createCustomer: async(req, res) => {
         const dbCustomer = await Customer.find({}),
             listAtelier = req.body.Atelier

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
                 Atelier: listAtelier,
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