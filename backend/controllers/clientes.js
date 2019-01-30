import Cliente from '../models/clientes'

class clientes {

    novo(req, res) {
        var data = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            telefone: req.body.telefone,
            email: req.body.email,
            endereco: req.body.endereco
        }

        Cliente.find({ cpf: data.cpf }, (erro, cpf) => {
            if (cpf.length == 0 && erro == undefined) {
                Cliente.find({ rg: data.rg }, (erro, rg) => {
                    if (rg.length == 0 && erro == undefined) {
                        Cliente.find({ telefone: data.telefone }, (erro, telefone) => {
                            if (telefone.length == 0 && erro == undefined) {
                                Cliente.create(data)
                                    .then((cliente) => {
                                        res.send({
                                            mensagem: 'salvo com sucesso!',
                                            erro: false
                                        })
                                    },
                                        (erro) => {
                                            res.send({
                                                mensagem: 'ocorreu um problema ao tentar salvar os dados: ' + erro,
                                                erro: true
                                            })
                                        })
                                    .catch((e) => {
                                        res.send({
                                            mensagem: 'ocorreu um erro de servidor: ' + e,
                                            erro: true
                                        })
                                    })
                            } else {
                                res.send({
                                    mensagem: 'Esse Telefone já está cadastrado!',
                                    erro: true
                                })
                            }
                        })
                    } else {
                        res.send({
                            mensagem: 'Esse RG já está cadastrado!',
                            erro: true
                        })
                    }
                })
            } else {
                res.send({
                    mensagem: 'Esse CPF já está cadastrado!',
                    erro: true,
                    cpf: cpf
                })
            }
        })
    }

    buscaTodos(req, res) {
        Cliente.find()
            .then((clientes) => {
                res.send(clientes)
            },
                (erro) => {
                    res.send('Ocorreu um erro: ' + erro)
                })
            .catch((e) => {
                res.send('erro interno no servidor: ' + e)
            })
    }
}

export default clientes;