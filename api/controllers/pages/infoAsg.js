module.exports = {
    get: (req, res) => {
        sess = req.session,
            res.render('InfoAsg', {

                sess
            })
    }
}