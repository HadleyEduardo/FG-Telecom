import React, { Component } from 'react'
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBInput, MDBBtn, MDBIcon} from "mdbreact";
import axios from 'axios'
import './cadastrarItensEstoque.css'

class cadastrarItensEstoque extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggleTabs: {
                1: 'nav-link active',
                2: 'nav-link',
            },
            conteudoNavTab: null
        }
    }

    componentWillMount(){
        this.navTabData(1)
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
        var produto = {
            codigo: e.target['codigo-de-barras'].value,
            nome: e.target['nome-do-produto'].value,
            marca: 'teste',
            modelo: e.target['marca-modelo'].value
        }
        axios.post('http://localhost:3001/estoque/produto/novo', produto)
            .then((res) => {
                var mensagem = res.data.mensagem
                var erro = res.data.erro
                if(erro){
                    alert(mensagem)
                }else{
                    alert(mensagem)
                    window.location.href = 'http://localhost:3000/estoque'
                }
            }, (erro) => {
                console.log('erro: ' + erro)
            })
            .catch((err) => {
                console.log(err)
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
                    <form onSubmit={(e) => this.salvarDadosNovoProduto(e)}>
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
                                    <i class="fa fa-tag prefix fa-2x"></i>
                                </div>
                                <div id='select'>
                                    <select onFocus={false} name='marca-modelo' className="select-itens">
                                        <option>Marca & Modelo</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
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
                <h1>modelo</h1>
            </div>
        )
    }

    render() {
        return (
            <div class="container">
                
                <br />
                <div class="row">
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='nav nav-tabs'>
                            <div className='nav-item'>
                                <a onClick={() => this.toggleTabs(1)} className={this.state.toggleTabs["1"]} role="tab" data-toggle="tab" href='#home'>Produto</a>
                            </div>
                            <div className='nav-item'>
                                <a onClick={() => this.toggleTabs(2)} className={this.state.toggleTabs["2"]} role="tab" data-toggle="tab" href='#profile'>Marca & Modelo</a>
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