module.exports = {
    get: (req, res) => {
        sess = req.session,
            res.render('Contact', {

                sess
            })
    }
}