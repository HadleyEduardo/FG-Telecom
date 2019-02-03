var mongoose = require('mongoose');

var modelo = new Schema({
    nome: {
        type: String,
        require: true
    },
    marca: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Modelo', modelo);