import express from 'express';
import ClienteController from '../controllers/clientes';

const router = express.Router();
let ctrlCliente = new ClienteController();

/* GET index page. */
router.get('/clientes', ctrlCliente.buscaTodos);

router.post('/clientes/novo', ctrlCliente.novo);

export default router;
