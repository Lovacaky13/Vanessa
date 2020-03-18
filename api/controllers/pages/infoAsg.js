const Message = require('../../db/models/Message')


module.exports = {
    get: async(req, res) => {
        const sess = req.session,
            dbMessage = await Message.find({})

        res.render('InfoAsg', {
            sess,
            dbMessage
        })
    }
}