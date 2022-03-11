const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: { type: String,},
    nama: { type: String, required: true },
    kode : { type: Number, required: true },
    jenis: { type: String, required: true },
    jumlah: { type: Number, required: true },
    harga: { type: Number, required: true },
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);