const Message = require('../../db/models/Message')


module.exports = {
    get: async(req, res) => {
        const sess = req.session,
            dbMessageNotChecked = await Message.find({ view: false })


        res.render('Agenda', {
            sess,
            dbMessageNotChecked
        })
    }
}