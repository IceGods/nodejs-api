const Profile = require('../models/profile');
const mongoose = require('mongoose');


exports.add_profile = (req, res, next) => {
    const profile = new Profile({
        _id: new mongoose.Types.ObjectId(),
        nama_depan: req.body.nama_depan,
        nama_belakang: req.body.nama_belakang,
        tentang_toko: req.body.tentang_toko,
        email: req.body.email,
        nomor_hp: req.body.nomor_hp,
        negara: req.body.negara,
        bahasa: req.body.bahasa,
        mata_uang: req.body.mata_uang,
        npwp: req.body.npwp,
        foto: req.file.path
    });
    profile.save()
        .then((result) => {
            res.status(201).json({
                message: 'Profile created successfully',
                createdProduct: {
                type: 'GET',
                url: 'https://radia-api.herokuapp.com/profile/' + result.id
            }
        });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.get_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('nama_depam nama_belakang tentang_toko email nomor_hp negara bahasa mata_uang npwp _id foto')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(401).json({ message: 'No valid entry found for given ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}


exports.update = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {
        nama_depan: req.body.nama_depan,
        nama_belakang: req.body.nama_belakang,
        tentang_toko: req.body.tentang_toko,
        email: req.body.email,
        nomor_hp: req.body.nomor_hp,
        negara: req.body.negara,
        bahasa: req.body.bahasa,
        mata_uang: req.body.mata_uang,
        npwp: req.body.npwp,
        foto: req.file.path
    }
 
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message:'Successfully Update'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}