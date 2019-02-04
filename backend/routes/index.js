import express from 'express';
import ClienteController from '../controllers/clientes';
import ProdutoController from './../controllers/produto';
import ModeloController from './../controllers/modelo';

const router = express.Router();
let ctrlCliente = new ClienteController();
let ctrlProduto = new ProdutoController();
let ctrlModelo = new ModeloController();

/* GET index page. */
router.get('/', function(req, res, next) {
    res.send('Bem Vindo a API FG-Telecom');
    next();
})

router.get('/clientes', ctrlCliente.buscaTodos);
router.post('/clientes/novo', ctrlCliente.novo);

router.get('/estoque/produto', ctrlProduto.buscaTodos);
router.post('/estoque/produto/novo', ctrlProduto.novo);

router.get('/estoque/modelo', ctrlModelo.buscaTodos);
router.post('/estoque/modelo/novo', ctrlModelo.novo);

export default router;
