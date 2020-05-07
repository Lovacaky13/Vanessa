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
                 email: req.body.email,
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