const Message = require('../../db/models/Message')


module.exports = {
    get: async(req, res) => {
        const sess = req.session,
            dbMessage = await Message.find({}),
            dbMessageNotChecked = await Message.find({ view: false })

        res.render('Contact', {
            sess,
            dbMessageNotChecked
        })
    },

    addMessage: async(req, res) => {
        console.log('add message');

        Message.create({
            createDate: new Date(),
            subject: req.body.subject,
            view: false,
            author: req.body.author,
            email: req.body.email,
            message: req.body.message,

        })
        res.redirect('back')
    },

    delMessage: async(req, res) => {
        const dbMessage = await Message.findById(req.params.id),
            query = { _id: req.params.id }
        Message.deleteOne(query,

            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Message Deleted.')
                    res.redirect('back')
                }
            })
    },

    put: async(req, res) => {
        const dbMessage = await Message.findById(req.params.id),
            query = { _id: req.params.id }

        if (dbMessage.view == false) {
            Message.updateOne(query, {
                view: true,

            }, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('back')

                }
            })
        } else {
            (dbMessage.view == true)
            Message.updateOne(query, {
                view: false,

            }, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('back')

                }
            })
        }
    }
}