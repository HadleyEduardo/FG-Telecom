var mongoose = require('mongoose');

var produto = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        require: true,
    },
    codigo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Produto', produto);