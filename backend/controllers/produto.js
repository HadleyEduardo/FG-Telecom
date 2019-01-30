import Produto from './../models/Produto';

class produto {
    novo(req, res) {
        var obj = {
            nome: req.body.nome.value,
            marca: req.body.marca.value,
            modelo: req.body.modelo.value,
            codigo: req.body.codigo.value
        }

        Produto.find({codigo: obj.codigo}, (erro, codigo) => {
            if(erro) {
                res.send({
                    mensagem: 'O banco de dados está inativo no momento.\nTente novamente mais tarde!',
                    erro: true
                });
            }
            
            if(codigo.length > 0) {
                res.send({
                    mensagem: 'Um produto com o mesmo código já existe!',
                    erro: true
                });
            }
        });

        Produto.create(obj).then((produto) => {
            res.send({
                mensagem: 'Salvo com sucesso!',
                error: false
            });
        }, (erro) => {
            res.send({
                mensagem: 'Ocorreu um problema ao tentar salvar os dados: ' + erro,
                error: true
            });
        }).catch((e) => {
            res.send({
                mensagem: 'Ocorreu um erro de servidor: ' + erro,
                error: true
            });
        });    
    }

    buscaTodos(req, res) {
        Produto.find().then((produto) => {
            res.send(produto);
        }, (erro) => {
            res.send('Ocorreu um erro: ' + erro);
        }).catch((e) => {
            res.send('Ocorreu um erro interno no servidor: ' + e);
        })
    }
}

export default produto;