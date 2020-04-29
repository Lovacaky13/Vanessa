const User = require('../db/models/User')


module.exports = {
    acceptCookie: async(req, res) => {
        const acceptCookie = await User.findOne({
            email: req.session.email
        })

        User.updateOne(
            acceptCookie, {
                cookieNotAccept: false
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