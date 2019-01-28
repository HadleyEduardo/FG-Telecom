var mongoose = require('mongoose');

var produto = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    codigo: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Produto', produto);