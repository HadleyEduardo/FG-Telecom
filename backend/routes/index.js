import express from 'express';
import ClienteController from '../controllers/clientes';
import ProdutoController from './../controllers/produto';

const router = express.Router();
let ctrlCliente = new ClienteController();
let ctrlProduto = new ProdutoController();

/* GET index page. */
router.get('/clientes', ctrlCliente.buscaTodos);
router.get('/estoque', ctrlProduto.buscaTodos);

router.post('/clientes/novo', ctrlCliente.novo);
router.post('/estoque/novo-produto', ctrlProduto.novo);

export default router;
