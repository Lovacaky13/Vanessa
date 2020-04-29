const Com = require('../../db/models/Commentaire'),
    Atelier = require("../../db/models/Atelier"),
    path = require('path'),
    fs = require('fs'),
    Message = require('../../db/models/Message')

module.exports = {
    getAtelier: async(req, res) => {
        const dbAtelier = await Atelier.findById(req.params.id), // Transforme ton Model (consctructeur) en Json
            sess = req.session,
            dbCom = await Com.find({
                produit_id: req.params.id
            }),
            dbMessageNotChecked = await Message.find({
                view: false
            })

        res.render('AtelierSingle', {
            dbAtelier, // Renvoyer la DB dans la page       
            sess,
            dbCom,
            dbMessageNotChecked
        })
    },

    updateAtelier: async(req, res) => {
        const dbAtelier = await Atelier.findById(req.params.id),
            query = {
                _id: req.params.id
            },
            ImgGallery = req.files.imageGallery,
            supImg = req.body.deleteImg,
            addImg = req.body.imageGallery = 1,
            multiple = req.files.imageGallery > 1

        console.log('Req.Body :')
        console.log(req.body)
        console.log('Req.Files  :')
        console.log(req.files)
        console.log('req.file.imagegallery :')
        console.log(req.files.imageGallery)
        console.log('ImgGallery :')
        console.log(ImgGallery)
        console.log('req.body.deleteImg :')
        console.log(req.body.deleteImg)
        console.log('req.body.addImg :')
        console.log(addImg)

        if (req.body && !ImgGallery && !supImg) {
            /*
             *  Changer Texte
             **********************/
            console.log('edit req.body (no file)')
            Atelier.updateOne(query, {
                    title: req.body.title,
                    content: req.body.content
                },
                (err) => {
                    if (err) console.log(err)
                    else res.redirect('back')
                })

        } else if (supImg) {
            /*
             * Supprimer Une Image
             **********************/
            console.log('delete single img')
            const dbAtelier = await Atelier.findById(req.params.id),
                files = dbAtelier.imageGallery
            arrayFiles = []

            console.log('?? req.body')
            console.log(req.body)
            console.log('?? dbAtelier')
            console.log(dbAtelier)

            for (let i = 0; i < files.length; i++) {
                const dbFilename = files[i].name
                if (dbFilename !== req.body.deleteImg) {
                    console.log(dbFilename)
                    arrayFiles.push({
                        name: files[i].name,
                        filename: files[i].filename,
                        originalname: files[i].name
                    })
                }
            }

            console.log('arrayfiles :')
            console.log(arrayFiles)

            Atelier.updateOne(query, {
                    ...req.body,
                    imageGallery: arrayFiles
                },
                (err) => {
                    if (!err) {
                        fs.unlink(path.resolve('public/images/' + req.body.deleteImg),
                            (err) => {
                                if (err) throw err
                            })
                        res.redirect('back')
                    } else {
                        return res.send(err)
                    }
                })
        } else if (addImg) {
            /*
             *  Ajouter Une Image
             **********************/
            const dbAtelier = await Atelier.findById(req.params.id),
                query = {
                    _id: req.params.id
                },
                // Gallery Existante
                dbFiles = dbAtelier.imageGallery,
                // req.files
                files = ImgGallery,
                // Definition d'un tableau qui va acceuillir
                arrayFiles = []

            console.log('AddImage :')
            console.log(dbFiles)

            // Boucle pour chercher les files existant dans la DB et les ajouter au tableau arrayFiles
            for (let i = 0; i < dbFiles.length; i++) {
                const dbFilename = dbFiles[i].filename
                if (dbFiles) {
                    console.log('images dans la db a ajouter dans array');
                    console.log(dbFiles[i].filename);
                    // On push les data existante dans arrayFiles
                    arrayFiles.push({
                        name: dbFiles[i].name,
                        filename: dbFiles[i].filename,
                        orifginalname: dbFiles[i].name
                    })
                }
            }
            console.log('image à ajouter');
            console.log(files);
            // Boucle pour chercher les req.files et les ajouter au tableau arrayFiles
            for (let i = 0; i < files.length; i++) {
                const dbFilename = files[i].filename
                if (files) {
                    console.log('image à ajouter');
                    console.log(files[i].filename)
                        // On push les data de notre req.files dans arrayFiles
                    arrayFiles.push({
                        name: files[i].filename,
                        filename: `/assets/images/${files[i].filename}`,
                        orifginalname: files[i].originalname
                    })
                }
            }

            console.log('?? Array files')
            console.log(arrayFiles)

            // Fonction update Mongoose
            Atelier.updateOne(query, {
                    ...req.body,
                    imageGallery: arrayFiles
                },
                // CallBack de la function Mongoose
                (err) => {
                    if (!err) {
                        res.redirect('back')
                    } else {
                        return res.send(err)
                    }
                })
        }
    },

    deleteOneAtelier: async(req, res, next) => {
        const dbAtelier = await Atelier.findById(req.params.id),
            dbCom = await Com.findById(req.params.id),
            query = {
                _id: req.params.id
            },
            queryCom = {
                produit_id: req.params.id
            },
            pathImg = path.resolve("public/images/" + dbAtelier.name),
            files = dbAtelier.imageGallery
        console.log(dbAtelier)
        console.log(dbCom)
        if (files && pathImg) {
            Atelier.deleteOne(query,
                (err) => {
                    if (!err) {

                        for (let i = 0; i < files.length; i++) {
                            const dbFilename = files[i].filename
                            if (files) {
                                fs.unlink(path.resolve('public/images/' + files[i].name),
                                    (err) => {
                                        if (err) console.log(err)
                                        else console.log('imageGallery Supprimée') && next()
                                    })
                            }
                        }
                        if (pathImg) {
                            fs.unlink(pathImg,
                                (err) => {
                                    if (err) console.log(err)
                                    else console.log('imageSeule Supprimée') && next()
                                })
                        }
                        if (queryCom) {
                            Com.deleteMany(queryCom,
                                (err) => {
                                    if (err) console.log(err)
                                    else console.log('Commentaire Supprimé') && next()
                                }
                            )
                        } else next()
                        return res.redirect('/Atelier')
                    } else {
                        console.log('Erreur de suppression Atelier')
                        return res.send(err)
                    }

                }
            )
        }
    },

    addCom: async(req, res) => {
        console.log('add com');

        Com.create({
            createDate: new Date(),
            produit_id: req.params.id,
            lastname: req.session.lastname,
            firstname: req.session.firstname,
            content: req.body.content,
        })
        res.redirect('back')
    },

    DelCom: async(req, res) => {
        const dbCom = await Com.findById({
            _id: req.params.id
        })
        dbCom.deleteOne({
            _id: req.params.id
        })
        console.log('delete com');

        res.redirect('back')
    }
}