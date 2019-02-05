import Cliente from '../models/clientes'

class clientes {
    
    novo(req, res) {
        try{
            var data = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                rg: req.body.rg,
                telefone: req.body.telefone,
                email: req.body.email,
                endereco: req.body.endereco
            }

            Cliente.find()
                .then((clientes) => {
                    if(clientes.length === 0) {
                        Cliente.create(data)
                            .then((cliente) => {
                                return res.send({
                                    mensagem: 'salvo com sucesso!',
                                    erro: false
                                })
                            },
                                (erro) => {
                                    return res.send({
                                        mensagem: 'ocorreu um problema ao tentar salvar os dados: ' + erro,
                                        erro: true
                                    })
                                })
                            .catch((e) => {
                                return res.send({
                                    mensagem: 'ocorreu um erro de servidor: ' + e,
                                    erro: true
                                })
                            })
                    }else{

                        Cliente.find({ cpf: data.cpf }, (erro, cpf) => {
                            if (cpf.length == 0 && erro == undefined) {
                                Cliente.find({ rg: data.rg }, (erro, rg) => {
                                    if (rg.length == 0 && erro == undefined) {
                                        Cliente.find({ telefone: data.telefone }, (erro, telefone) => {
                                            if (telefone.length == 0 && erro == undefined) {
                                                Cliente.create(data)
                                                    .then((cliente) => {
                                                        return res.send({
                                                            mensagem: 'salvo com sucesso!',
                                                            erro: false
                                                        })
                                                    },
                                                        (erro) => {
                                                            return res.send({
                                                                mensagem: 'ocorreu um problema ao tentar salvar os dados: ' + erro,
                                                                erro: true
                                                            })
                                                        })
                                                    .catch((e) => {
                                                        return res.send({
                                                            mensagem: 'ocorreu um erro de servidor: ' + e,
                                                            erro: true
                                                        })
                                                    })
                                            } else {
                                                return res.send({
                                                    mensagem: 'Esse Telefone já está cadastrado!',
                                                    erro: true
                                                })
                                            }
                                        })
                                    } else {
                                        return res.send({
                                            mensagem: 'Esse RG já está cadastrado!',
                                            erro: true
                                        })
                                    }
                                })
                            } else {
                                return res.send({
                                    mensagem: 'Esse CPF já está cadastrado!',
                                    erro: true,
                                    cpf: cpf
                                })
                            }
                        })
                    }
            }, (erro) => {
                return res.send('Ocorreu um erro: ' + erro)
            })
            .catch((e) => {
                return res.send('erro interno no servidor: ' + e)
            })

        }catch(e) {
            console.log(e)
        }
    }

    buscaTodos(req, res) {
        Cliente.find()
            .then((clientes) => {
                return res.send(clientes)
            }, (erro) => {
                return res.send('Ocorreu um erro: ' + erro)
            })
            .catch((e) => {
                return res.send('erro interno no servidor: ' + e)
            })
    }

    editar(req, res) {
        try{
            var data = req.body
            
            Cliente.find({ cpf: data.cpf }, (erro, cpf) => {

                if ((cpf.length == 0 || (cpf[0].id === data.id && cpf.length == 1)) && erro == undefined) {
                    Cliente.find({ rg: data.rg }, (erro, rg) => {
                        if ((rg.length == 0 || (rg[0].id === data.id && rg.length == 1)) && erro == undefined) {
                            Cliente.find({ telefone: data.telefone }, (erro, telefone) => {
                                if ((telefone.length == 0 || (telefone[0].id == data.id && telefone.length == 1)) && erro == undefined) {
                                    Cliente.findByIdAndUpdate(data.id, data).exec()
                                        .then((cliente) => {
                                            res.send({erro: false, mensagem: 'Cliente editado com sucesso!'})
                                        }, (erro) => {
                                            console.log(erro)
                                            res.status(500).send({erro: true, mensagem: 'Falha ao tentar editar cliente!'})
                                        }) 
                                } else {
                                    return res.send({
                                        mensagem: 'Esse Telefone já está cadastrado!',
                                        erro: true
                                    })
                                }
                            })
                        } else {
                            return res.send({
                                mensagem: 'Esse RG já está cadastrado!',
                                erro: true
                            })
                        }
                    })
                } else {
                    return res.send({
                        mensagem: 'Esse CPF já está cadastrado!',
                        erro: true,
                        cpf: cpf
                    })
                }
            })
            
        }catch(e) {
            res.send({erro: true, mensagem: e})
        }
    }
}

export default clientes;