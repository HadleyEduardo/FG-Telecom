import express from 'express';
import ClienteController from '../controllers/clientes';
import ProdutoController from './../controllers/produto';

const router = express.Router();
let ctrlCliente = new ClienteController();
let ctrlProduto = new ProdutoController();

/* GET index page. */
router.get('/', function(req, res) {
    res.send('Bem Vindo a API FG-Telecom')
})

router.get('/clientes', ctrlCliente.buscaTodos);
router.post('/clientes/novo', ctrlCliente.novo);

router.get('/estoque/produto', ctrlProduto.buscaTodos);
router.post('/estoque/produto/novo', ctrlProduto.novo);



export default router;
