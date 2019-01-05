var mongoose = require('mongoose');

var cliente = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    rg: {
        type: Number,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    endereco: {
        rua: {
            type: String,
            required: false
        },
        numero: {
            type: Number,
            required: false
        },
        bairro: {
            type: String,
            required: false
        },
        cidade: {
            type: String,
            required: false
        },
        pontoReferencia: {
            type: String,
            required: false
        }
    }
})

module.exports = mongoose.model('Cliente', cliente);