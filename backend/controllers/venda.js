import Produto from './../models/produto';
import Venda from './../models/venda';
class venda {

    SalvarCompra(req, res) {
        var objeto = {
            funcionario: req.body.funcionario,
            cpf: req.body.cpf,
            data: req.body.data,
            produtos: req.body.produtos,
        }
        Venda.create(objeto)
            .then((venda) => {
                res.send("Salvo com Sucesso")
            },
                (erro) => {
                    return res.send({
                        mensagem: 'ocorreu um problema ao tentar salvar os dados: ' + erro,
                        erro: true,
                        dadosForm: data
                    })
                }).catch((e) => {
                    return res.send({
                        mensagem: 'ocorreu um erro de servidor: ' + e,
                        erro: true,
                        dadosForm: data
                    })
                })
    }

    busca(req, res) {
        var tipo = req.body.tipo;
        var valor = req.body.valor;
        Produto.find({ [tipo]: valor })
            .then((venda) => {
                return res.send(venda)
            }, (erro) => {
                return res.send('Ocorreu um erro: ' + erro)
            })
    }
    //Para visualisar objeto com vetor
    teste(req, res) {
        Venda.find()
            .then((venda) => {
                return res.send(venda)
            }, (erro) => {
                return res.send('Ocorreu um erro: ' + erro)
            })
            .catch((e) => {
                return res.send('erro interno no servidor: ' + e)
            })
    }
}
export default venda;