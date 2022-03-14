const Product = require('../models/products');
const mongoose = require('mongoose');

exports.get_all = (req, res, next) => {
    Product.find()
        .select('nama kode jenis jumlah harga _id productImage')
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                products: docs.map((doc) => {
                    return {
                        nama: doc.nama,
                        kode: doc.kode,
                        jenis: doc.jenis,
                        jumlah: doc.jumlah,
                        harga: doc.harga,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/products/' + doc.id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.add_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        nama: req.body.nama,
        kode: req.body.kode,
        jenis: req.body.jenis,
        jumlah: req.body.jumlah,
        harga: req.body.harga,
        productImage: req.file.path
    });
    product.save()
        .then((result) => {
            res.status(201).json({
                message: 'Product created successfully',
                createdProduct: {
                    type: 'GET',
                    url: 'https://radia-api.herokuapp.com/products' + result.id
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
        .select('nama kode jenis jumlah harga _id productImage')
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
        nama : req.nama,
        kode: req.kode,
        jenis: req.jenis,
        jumlah: req.jumlah,
        harga : req.harga,
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


exports.delete = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}