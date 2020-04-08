/**
 * Middleware Authentification
 * 
 */

const User = require('../db/models/User');

module.exports = (req, res, next) => {


    User.findById(req.session.userId, (error, user) => {

        if (user === true && !error) {

            next()
        } else {
            console.log(error);
            return res.redirect('/')
        }
    })
}