const User = require("../../db/models/User")

module.exports = {

    get: async(req, res) => {
        const
            sess = req.session,
            dbUserID = await User.findById(sess.userId),
            emailProfile = await req.body.email

        console.log(dbUserID);

        User.findOne({ emailProfile },


                (error, user) => {
                    if (!user) {

                        console.log('1')
                    }
                }),


            res.render("Profil", {
                sess,
                dbUserID
            })
    }

}