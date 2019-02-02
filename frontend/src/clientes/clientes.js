import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './clientes.css';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBIcon, MDBBtn } from "mdbreact";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import axios from 'axios';

class clientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaClientes: [],
            RenderConteudo: () => {

            },
            modal: true,
            qtdPaginas: 1,
            conteudoPaginacao: () => {

            },
            classActive: 'active',
            estiloBotaoMudarPagina: 'disabled'
        };
        this.fazerPaginacao = this.fazerPaginacao.bind(this)
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    fazerPaginacao(clientList) {
        //definindo número de páginas
        var qtdPaginas = 0
        for(var i = 2; ; i += 2){
            qtdPaginas++
            if(i >= clientList.length){
                
                var conteudoPaginacao = []
                for(var i = 0; i < qtdPaginas; i++){
                    if(this.props.clientesDados.paginaAtual === (i + 1)){
                        conteudoPaginacao[i] = (<div id={'item' + (i + 1)} className={"page-item " + this.state.classActive}> <a class="page-link">{i + 1}</a> </div>)    
                    }else{
                        conteudoPaginacao[i] = (<div id={'item' + (i + 1)} className="page-item"> <a class="page-link">{i + 1}</a> </div>)
                    }
                    
                }
                this.setState({conteudoPaginacao: () => {
                    return conteudoPaginacao.map((pagina, key) => {
                        return <div className='' onClick={(e) => {
                            this.props.controlarPaginacaoCliente(key + 1)
                        }} key={key}>{pagina}</div>
                    })
                }, qtdPaginas}, () => {
                    this.preencherTabela()
                })
                
                
                break;
            }
        }
        // ---------------------------- //
    }

    componentDidMount() {
        if (this.props.clientesDados.clientList === null) {
            axios.get('http://localhost:3001/clientes')
                .then((res) => {
                    const client = res.data;
                    this.props.pegandoDadosServidor(client)
                    document.querySelector('div#loader').style.visibility = 'hidden'
                    this.fazerPaginacao(client)
                }, (erro) => {
                    var interval = setInterval(() => {
                        axios.get('http://localhost:3001/clientes')
                            .then((res) => {
                                clearInterval(interval)
                                const client = res.data;
                                this.props.pegandoDadosServidor(client)
                                document.querySelector('div#loader').style.visibility = 'hidden'
                                this.fazerPaginacao(client)
                            })
                    }, 1000)
                    this.setState({
                        RenderConteudo: () => {
                            return (
                                <div>
                                    <MDBContainer>
                                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} side position="bottom-rigth" size='sm'>
                                            <MDBModalHeader style={{ backgroundColor: '#FFBB33', color: 'white', fontWeight: 'bold' }}> <MDBIcon icon="exclamation-triangle" /> Alerta </MDBModalHeader>
                                            <MDBModalBody>
                                                A conexão com a internet está interrompida ou o servidor está com problemas!
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="warning" size='sm' onClick={this.toggle}>Ok, entendi!</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>
                                    </MDBContainer>
                                </div>

                            )
                        }
                    })
                })
        } else {
            document.querySelector('div#loader').style.visibility = 'hidden'
            this.fazerPaginacao(this.props.clientesDados.clientList)
           
            

            
        }
        
    }

    preencherTabela() {
        var cliente = this.props.clientesDados.clientList;
        if (cliente !== null) {
            var renderListCliente = [];
            
            for (var i = this.props.clientesDados.inicioPaginacao; i < this.props.clientesDados.fimPaginacao; i++) {
                if(cliente[i] === undefined) {
                    break;
                }
                renderListCliente[i] = (

                    <tr>
                        <td>{(i + 1)}</td>
                        <td>{cliente[i].nome}</td>
                        <td>{cliente[i].cpf}</td>
                        <td>{cliente[i].telefone}</td>
                        <td class="actions">
                            <button className="btn btn-success btn-sm" >Visualizar</button>
                            <button className="btn btn-warning btn-sm" >Editar</button>
                            <button className="btn btn-danger btn-sm"  >Excluir</button>
                        </td>
                    </tr>

                )

            }
            this.renderConteudoTabela(renderListCliente)
        }
    }

    renderConteudoTabela(conteudo) {
        this.setState({
            RenderConteudo: () => {
                return conteudo.map((tr) => {
                    return tr
                })
            }
        })

    }



    render() {
        var classAnterior = null
        var classProximo = null
        if(this.props.clientesDados.paginaAtual === 1){
            classAnterior = 'page-item ' + this.state.estiloBotaoMudarPagina
        }else{
            classAnterior = 'page-item'
        }

        if(this.state.qtdPaginas === this.props.clientesDados.paginaAtual){
            classProximo = 'page-item ' + this.state.estiloBotaoMudarPagina
        }else{
            classProximo = 'page-item'
        }

        return (
            <div>
                <div className="container">

                    <div className='row'>
                        <div className='col-sm-12'>
                            <h2 style={{ textAlign: 'center' }}>Clientes</h2>
                        </div>
                    </div>


                    <br />

                    <div className="row">

                        <div className="col-sm-3 col-xs-0"></div>

                        <div className="col-sm-5 col-xs-3">
                            <form className="form-inline mt-1 mb-4">
                                <MDBIcon icon="search" />
                                <input style={{ width: '80%' }} className="form-control form-control-sm ml-2" type="text" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>

                        <div className="col-sm-2 col-xs-0"></div>

                        <div className="col-sm-2 col-xs-1">
                            <Link to='/clientes/novo'>
                                <button className="btn btn-primary btn-sm" id="gambiarra"> <MDBIcon icon="plus" /> &nbsp; NOVO</button>
                            </Link>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='table-responsive'>
                            <table className="table table-striped" cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Telefone</th>
                                        <th className="actions">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.RenderConteudo()}

                                </tbody>
                            </table>

                        </div>
                        <div id='loader' style={{ display: 'block', margin: '0 auto' }} className="loader small"></div>
                    </div>



                    <div className='row'>

                        <div className='col-lg-0 col-md-1 col-sm-2 col-sx-0'></div>

                        <div className='col-sm-2 col-md-2 col-lg-1 col-xs-1'>
                            <div aria-label="Page navigation">
                                <div className="pagination pg-blue justify-content-center">
                                    <div className={classAnterior}>
                                        <a className="page-link" onClick={() => this.props.controlarPaginacaoCliente(this.props.clientesDados.paginaAtual - 1)}>Anterior</a>
                                    </div>
                                    {this.state.conteudoPaginacao()}
                                    <div className={classProximo}>
                                        <a className="page-link" onClick={() => this.props.controlarPaginacaoCliente(this.props.clientesDados.paginaAtual + 1)}>Próximo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default clientes

