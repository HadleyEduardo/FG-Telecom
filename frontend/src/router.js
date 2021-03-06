import React, { Component } from 'react'

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

class router extends Component {

    render() {
        return (
            <div>
                <Route exact={true} path='/' component={() => <Agenda />} />
                <Route path='/vendas' component={() => <Vendas />} />
                <Route exact={true} path='/estoque' component={() => <Estoque />} /> 
                <Route path='/estoque/novo-item' component={() => <CadastrarItensEstoque pegandoDadosModeloEstoque={(dados) => this.props.pegandoDadosModeloEstoque(dados)} estoqueDados={this.props.estoqueDados} />} />
                <Route exact={true} path='/clientes' component={() => <Clientes selecionarCliente={(cliente) => this.props.selecionarCliente(cliente)} pegandoDadosServidor={(dados) => this.props.pegandoDadosServidor(dados)} controlarPaginacaoCliente={(pagina) => this.props.controlarPaginacaoCliente(pagina)} clientesDados={this.props.clientesDados} salvarFiltro={(filtro) => this.props.salvarFiltro(filtro)} />} />
                <Route path='/clientes/novo' component={() => <CadastrarCliente size={this.props.sizeInput} />} />
                <Route path='/ordem-de-servico' component={() => <OrdemServico />} />
                <Route path='/funcionarios' component={() => <Funcionarios />} />
                <Route path='/ajuda' component={() => <Ajuda />} />
            </div>
        )
    }
}

export default router