import React, {Component} from 'react'

//importando dependencia que administra as rotas, por exemplo: localhost:3000/rotas
import { Route } from 'react-router-dom'

//importando as opcoes de menu para serem setadas nas rotas do React
import Agenda from './agenda/agenda'
import Vendas from './venda/venda'
import Estoque from './estoque/estoque'
import Clientes from './clientes/clientes'
import OrdemServico from './ordemDeServico/ordemDeServico'
import Funcionarios from './funcionarios/funcionarios'
import Ajuda from './ajuda/ajuda'

class router extends Component{

    render(){
        return(
            <div>
                <Route exact={true} path='/' component={() => <Agenda />} />
                <Route exact={true} path='/vendas' component={() => <Vendas />} />
                <Route exact={true} path='/estoque' component={() => <Estoque />} />
                <Route exact={true} path='/clientes' component={() => <Clientes />} />
                <Route exact={true} path='/ordem-de-servico' component={() => <OrdemServico />} />
                <Route exact={true} path='/funcionarios' component={() => <Funcionarios />} />
                <Route exact={true} path='/ajuda' component={() => <Ajuda />} />
            </div>
        )
    }
}

export default router