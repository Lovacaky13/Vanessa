const User = require('../db/models/User'),
    nodemailerKeys = require('../config/keys')


module.exports = {
    acceptCookie: async(req, res) => {
        const acceptCookie = await User.findOne({
            email: req.body.email
        })

        console.log(req.hostname)

        User.updateOne(
            acceptCookie, {
                cookieNotAccept: false,
            },
            res.cookie('cookie', '', {
                domain: req.hostname,
                path: '/',
                maxAge: 86400000
            }),
            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("cookie accepté");
                    req.session.cookieNotAccept = false;
                    res.redirect('back')
                }
            })
    }
}