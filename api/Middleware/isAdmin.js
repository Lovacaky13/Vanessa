/**
 * Middleware Admin
 * 
 */

const User = require('../db/models/User');

module.exports = (req, res, next) => {


    User.findById(req.session.userId, (error, user) => { // Connecte l'utilisateur dans la base de donné

        if (user && user.isAdmin == true && !error) {


            next()
        } else {
            console.log(error);
            return res.redirect('/')
        }
    })
}