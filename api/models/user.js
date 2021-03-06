const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {type: String},
    nama_depan: {type: String, required: true},
    nama_belakang: {type: String, required: true},
    tentang_toko: {type: String, },
    email: {type: String,required: true,unique: true,},
    password: { type: String,required: true },
    nomor_hp: {type: Number, required: true},
    negara: {type: String, required: true},
    bahasa: {type: String, required: true},
    mata_uang: {type: String, required: true},
    npwp: {type: Number, required: true},
    foto: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);