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
import CadastrarCliente from './cadastrarCliente/cadastrarCliente'
import CadastrarItensEstoque from './cadastrarItensEstoque/cadastrarItensEstoque'
import CadastrarModelo from './cadastrarModeloAparelho/cadastrarModeloAparelho'

class router extends Component{

    render(){
        return(
            <div>
                <Route exact={true} path='/' component={() => <Agenda />} />
                <Route path='/vendas' component={() => <Vendas />} />
                <Route exact={true} path='/estoque' component={() => <Estoque />} />
                <Route path='/estoque/novo-item' component={() => <CadastrarItensEstoque />} />
                <Route path='/estoque/novo-modelo' component={() => <CadastrarModelo />} />
                <Route exact={true} path='/clientes' component={() => <Clientes />} />
                <Route path='/clientes/novo' component={() => <CadastrarCliente size={this.props.sizeInput} />} />
                <Route path='/ordem-de-servico' component={() => <OrdemServico />} />
                <Route path='/funcionarios' component={() => <Funcionarios />} />
                <Route path='/ajuda' component={() => <Ajuda />} />
            </div>
        )
    }
}

export default router