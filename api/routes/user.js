const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const storageConf = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {

        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject File
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File not found'), false);
    }
}

const upload = multer({
    storage: storageConf,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});


router.post('/', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email Already Exists'
                });
            } else {
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if (err) {
                        res.status(201).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            nama_depan: req.body.nama_depan,
                            nama_belakang: req.body.nama_belakang,
                            tentang_toko: req.body.tentang_toko,
                            email: req.body.email,
                            password: hash,
                            nomor_hp: req.body.nomor_hp,
                            negara: req.body.negara,
                            bahasa: req.body.bahasa,
                            mata_uang: req.body.mata_uang,
                            npwp: req.body.npwp,
                            foto: req.file.path
                        }).save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'user created successfully',
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                });
            }
        })
});


router.post('/login', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Faild"
                });
            } else {

                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth Faild'
                        });
                    }
                    if (result) {
                        const tocken = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                            'secrete',
                            {
                                expiresIn: "9d"
                            },

                        );
                        return res.status(200).json({
                            message: "Auth Successfull",
                            tocken: tocken
                        });
                    }
                    return res.status(401).json({
                        message: "Auth Faild"
                    });
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
});


router.delete('/:userId', (req, res, next) => {
    const userId = req.body.userId;

    User.deleteOne({ _id: userId })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: 'User Deleted Successfully'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;