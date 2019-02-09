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
                <Route exact={true} path='/' component={() => <Agenda rotaAtual={(rota) => this.props.rotaAtual(rota)} />} />
                <Route path='/vendas' component={() => <Vendas rotaAtual={(rota) => this.props.rotaAtual(rota)} />} />
                <Route exact={true} path='/estoque' component={() => <Estoque rotaAtual={(rota) => this.props.rotaAtual(rota)} />} />
                <Route path='/estoque/novo-item' component={() => <CadastrarItensEstoque rotaAtual={(rota) => this.props.rotaAtual(rota)} pegandoDadosModeloEstoque={(dados) => this.props.pegandoDadosModeloEstoque(dados)} estoqueDados={this.props.estoqueDados} />} />
                <Route exact={true} path='/clientes' component={() => <Clientes selecionarCliente={(cliente) => this.props.selecionarCliente(cliente)} modais={this.props.modais} infoModal={(info) => this.props.infoModal(info)} rotaAtual={(rota) => this.props.rotaAtual(rota)} pegandoDadosServidor={(dados) => this.props.pegandoDadosServidor(dados)} controlarPaginacaoCliente={(pagina) => this.props.controlarPaginacaoCliente(pagina)} clientesDados={this.props.clientesDados} />} />
                <Route path='/clientes/novo' component={() => <CadastrarCliente modais={this.props.modais} infoModal={(info) => this.props.infoModal(info)} rotaAtual={(rota) => this.props.rotaAtual(rota)} size={this.props.sizeInput} />} />
                <Route path='/ordem-de-servico' component={() => <OrdemServico rotaAtual={(rota) => this.props.rotaAtual(rota)} />} />
                <Route path='/funcionarios' component={() => <Funcionarios rotaAtual={(rota) => this.props.rotaAtual(rota)} />} />
                <Route path='/ajuda' component={() => <Ajuda rotaAtual={(rota) => this.props.rotaAtual(rota)} />} />


            </div>
        )
    }
}

export default router