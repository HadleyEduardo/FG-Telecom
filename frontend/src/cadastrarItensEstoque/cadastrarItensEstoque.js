import React, { Component } from 'react'
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBInput, MDBBtn, MDBIcon} from "mdbreact";
import axios from 'axios'
import './cadastrarItensEstoque.css'
import modal from '../modais/manipulandoModal'

class cadastrarItensEstoque extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggleTabs: {
                1: 'nav-link active',
                2: 'nav-link',
            },
            conteudoNavTab: null,
            ativarModalSucesso: false,
            ativarModalErro: false,
            ativarModalAviso: false,
            mensagemModal: 'teste'
        }
    }

    componentWillMount(){
        //settando rota para selecionar a opção certa no menu lateral
        this.props.rotaAtual('estoque')
        
        this.navTabData(1)
        if(this.props.estoqueDados.modelos === null){
            axios.get('http://localhost:3001/estoque/modelo')
                .then((res) => {
                    console.log(res)
                    var modelos = res.data
                    this.props.pegandoDadosModeloEstoque(modelos)
                }, (err) => {
                    var mensagemModal = ' A conexão com a internet está interrompida ou o servidor está com problemas!'
                    modal('aviso', mensagemModal)
                    var interval = setInterval(() => {
                        axios.get('http://localhost:3001/estoque/modelo')
                            .then((res) => {
                                clearInterval(interval)
                                var modelos = res.data
                                this.props.pegandoDadosModeloEstoque(modelos)
                            })
                    }, 10000)
                })
        }
    }

    toggleTabs(id) {
        if(id === 1){
            this.setState({
                toggleTabs: {
                    1: 'nav-link active',
                    2: 'nav-link',
                }
            })
        }
        if(id === 2){
            this.setState({
                toggleTabs: {
                    2: 'nav-link active',
                    1: 'nav-link',
                }
            })
        }
        
        this.navTabData(id)
    }

    navTabData(id) {
        if(id === 1) {
            this.setState({conteudoNavTab: this.produto()})
        }
        if(id === 2) {
            this.setState({conteudoNavTab: this.modelo()})
        }
    }

    salvarDadosNovoProduto(e) {
        e.preventDefault()
        if(e.target['marca-modelo'].value === 'Marca & Modelo'){
            this.setState({ativarModalErro: true, mensagemModal: 'Por favor selecione um modelo!'})
        }else{
            var MarcaModelo = this.props.estoqueDados.modelos[e.target['marca-modelo'].value]
            const modelo = MarcaModelo.nome
            const marca = MarcaModelo.marca
            var produto = {
                codigo: e.target['codigo-de-barras'].value,
                nome: e.target['nome-do-produto'].value,
                modelo: modelo,
                marca: marca
            }
            
            if(produto.codigo === ''){
                var mensagemModal = 'Por favor insira o Código de Barras!'
                modal('erro', mensagemModal)
            }else{
                if(produto.nome === ''){
                    var mensagemModal = 'Por favor insira o Nome do Produto!'
                    modal('erro'. mensagemModal)
                }else{
                    axios.post('http://localhost:3001/estoque/produto/novo', produto)
                    .then((res) => {
                        var mensagem = res.data.mensagem
                        var erro = res.data.erro
                        if(erro){
                            var mensagemModal = mensagem
                            modal('erro', mensagemModal)
                        }else{
                            modal('sucesso', mensagem)
                            setTimeout(() => {
                                window.location.href = 'http://localhost:3000/estoque'
                            }, 1000)
                        }
                    }, (erro) => {
                        var mensagem = 'A conexão com a internet pode estar interrompida ou o servidor está com problemas!'
                        modal('aviso', mensagem)
                    })
                    .catch((err) => {
                        var mensagem = 'Ocorreu um erro grave ao tentar salvar o produto no estoque! Tente novamente mais tarde!'
                        modal('aviso', mensagem)
                    })
                }
            }
        }
    }

    salvarDadosNovoModelo(e) {
        e.preventDefault()
        var modelo = {
            marca: e.target.marca.value,
            nome: e.target.modelo.value
        }
        axios.post('http://localhost:3001/estoque/modelo/novo', modelo)
            .then((res) => {
                var mensagem = res.data.mensagem
                var erro = res.data.erro
                if(erro){
                    var mensagemModal = mensagem
                    modal('erro', mensagemModal)
                }else{
                    modal('sucesso', mensagem)
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3000/estoque'
                    }, 1000)
                }
            }, (erro) => {
                var mensagem = 'A conexão com a internet pode estar interrompida ou o servidor está com problemas!'
                modal('aviso', mensagem)
            })
            .catch((err) => {
                var mensagem = 'Ocorreu um erro grave ao tentar salvar um novo modelo! Tente novamente mais tarde!'
                modal('aviso', mensagem)
            })
    }

    preencherSelect() {
        var modelos = this.props.estoqueDados.modelos
        var conteudoSelect = []
        if(modelos !== null) {
            if(modelos.length > 0) {        
                for(var i in modelos){
                    var modelo = modelos[i].nome
                    var marca = modelos[i].marca
                    conteudoSelect[i] = (<option value={i}>{modelo + ' - ' + marca}</option>)
                }
            }else{
                conteudoSelect[0] = (<option disabled>Não há modelos cadastrados</option>)
            }
        }
        return conteudoSelect.map((options, key) => {
            return options
        }) 
    }

    produto() {
        return(
            <div>
                <br />
                <br />
                <h5 style={{textAlign: 'center'}}>cadastrar produto</h5>
                <br />
                <br />
                <div className='container'>
                    <form name='produto' onSubmit={(e) => this.salvarDadosNovoProduto(e)}>
                        <div className='row'>
                            <div className='centralizar col-xs-2 col-md-7 col-lg-5 col-sm-7'>
                                <MDBInput icon='barcode' name='codigo-de-barras' label="Código de Barras" autoFocus={true} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='centralizar col-xs-2 col-md-7 col-lg-5 col-sm-7'>
                                <MDBInput icon='shopping-cart' name='nome-do-produto' label="Nome do Produto" />
                            </div>
                        </div>

                        <div className='row'>

                            <div className='centralizar col-md-7 col-lg-5 col-xs-5 col-sm-7'>
                                <br />
                                <div id='icon-select'>
                                    <i className="fa fa-tag prefix fa-2x"></i>
                                </div>
                                <div id='select'>
                                    <select onFocus={false} name='marca-modelo' className="select-itens">
                                        <option>Marca & Modelo</option>
                                        {this.preencherSelect()}
                                    </select>
                                </div>
                            </div>
                        </div>    
                        <br />
                        <br />
                        <div id='button-salvar'>
                            <MDBBtn type='submit' color="primary">
                                <MDBIcon icon='box-open' className='mr-1' /> Salvar
                            </MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    modelo() {
        return(
            <div>
                <br />
                <br />
                <h5 style={{textAlign: 'center'}}>Cadastrar Marca e Modelo</h5>
                <br />
                <br />
                <div className='container'>
                    <form name='modelo' onSubmit={(e) => this.salvarDadosNovoModelo(e)}>
                        <div className='row'>
                            <div className='centralizar col-xs-2 col-md-7 col-lg-5 col-sm-7'>
                                <MDBInput icon='building' name='marca' label="Marca" />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='centralizar col-xs-2 col-md-7 col-lg-5 col-sm-7'>
                                <MDBInput icon='tag' name='modelo' label="Modelo" />
                            </div>
                        </div>

                        <br />
                        <br />

                        <div id='button-salvar'>
                            <MDBBtn type='submit' color="primary">
                                <MDBIcon icon='box-open' className='mr-1' /> Salvar
                            </MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                
                <br />
                <div className="row">
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='nav nav-tabs'>
                            <div className='nav-item'>
                                <a onClick={() => this.toggleTabs(1)} className={this.state.toggleTabs["1"]} data-toggle="tab" href='#home'>Produto</a>
                            </div>
                            <div className='nav-item'>
                                <a onClick={() => this.toggleTabs(2)} className={this.state.toggleTabs["2"]} data-toggle="tab" href='#profile'>Marca & Modelo</a>
                            </div>
                        </div>
                        {this.state.conteudoNavTab}
                    </div>
                </div>
            </div>
        )
    }
}

export default cadastrarItensEstoque