const mongoose = require('mongoose');
const { NUMBER } = require('sequelize/types');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nama_depan: {type: String, required: true},
    nama_belakang: {type: String, required: true},
    username: {type: String, required: true},
    tentang_toko: {type: String, },
    email: {type: String, required: true , unique: true},
    nomor_hp: {type: Number, required: true},
    nagara: {type: String, required: true},
    bahasa: {type: String, required: true},
    mata_uang: {type: String, required: true},
    npwp: {type: Number, required: true},
    foto: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);