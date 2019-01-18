import Cliente from '../models/clientes'

class clientes{

    novo(req, res){
        const data = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            telefone: req.body.telefone,
            email: req.body.email,
            endereco: req.body.endereco
        }
        Cliente.create(data)
            .then((cliente) => {
                res.send('salvei')
            },
            (erro) => {
                res.send('ocorreu um problema: ' + erro)
            })
            .catch((e) => {
                res.send('ocorreu um erro de servidor: ' + e)
            })
    }

    buscaTodos(req, res){
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