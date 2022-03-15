const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nama_depan: {type: String, required: true},
    nama_belakang: {type: String, required: true},
    tentang_toko: {type: String, },
    email: {type: String, required: true , unique: true},
    nomor_hp: {type: Number, required: true},
    negara: {type: String, required: true},
    bahasa: {type: String, required: true},
    mata_uang: {type: String, required: true},
    npwp: {type: Number, required: true},
    foto: {type: String, required: true}
});

module.exports = mongoose.model('Profile', profileSchema);