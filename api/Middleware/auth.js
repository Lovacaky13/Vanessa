/**
 * Middleware Authentification
 * 
 */

const User = require('../db/models/User');

module.exports = (req, res, next) => {


    User.findById(req.session.userId, (error, user) => {



        if (user.isVerified === true && !error) {

            next()
        } else {

            function showAlert() {
                alert("Bonjour tout le monde!");
            }
            console.log(error);
            showAlert
            return res.redirect('/')
        }
    })
}