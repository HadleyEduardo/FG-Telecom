import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './clientes.css';
import ModalAviso from '../modais/modalAviso'
import ModalErro from '../modais/modalErro'
import ModalSucesso from '../modais/modalSucesso'
import { MDBCol, MDBRow, MDBIcon, MDBBtn } from "mdbreact";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import axios from 'axios';

class clientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaClientes: [],
            modalSucesso: false,
            modalErro: false,
            modalAviso: false,
            modal14: false,
            modal15: false,
            varModal: null,
            varEdiModal: null,
            mensagemModal: '',
            confirmarOperacao: null,
            btnConfirmacao: false,
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
        this.confirmarOperacao = this.confirmarOperacao.bind(this)
        this.excluirCliente = this.excluirCliente.bind(this)
    }

    componentWillMount() {
        this.props.rotaAtual('clientes')
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    visualisarModal(i) {
        this.setState({
            varModal: this.props.clientesDados.clientList[i.target.value],
        })
        this.toggleModalVisual();
    }

    toggleModalVisual() {
        this.setState({
            modal14: !this.state.modal14
        })
    }
    //Edição
    editarDados(i) {
        this.setState({
            varEdiModal: this.props.clientesDados.clientList[i.target.value],
        })
        console.log(this.varEdiModal)
        this.toggleModalEditar();
    }

    toggleModalEditar() {
        this.setState({
            modal15: !this.state.modal15
        })
    }

    //Edição

    fazerPaginacao(clientList) {
        //definindo número de páginas
        var qtdPaginas = 0
        for (var i = 9; ; i += 9) {
            qtdPaginas++
            if (i >= clientList.length) {

                var conteudoPaginacao = []
                for (var i = 0; i < qtdPaginas; i++) {
                    if (this.props.clientesDados.paginaAtual === (i + 1)) {
                        conteudoPaginacao[i] = (<div id={'item' + (i + 1)} className={"page-item " + this.state.classActive}> <a className="page-link">{i + 1}</a> </div>)
                    } else {
                        conteudoPaginacao[i] = (<div id={'item' + (i + 1)} className="page-item"> <a className="page-link">{i + 1}</a> </div>)
                    }

                }
                this.setState({
                    conteudoPaginacao: () => {
                        return conteudoPaginacao.map((pagina, key) => {
                            return <div className='' onClick={(e) => {
                                this.props.controlarPaginacaoCliente(key + 1)
                            }} key={key}>{pagina}</div>
                        })
                    }, qtdPaginas
                }, () => {
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
                    }, 10000)
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

    toggleModalErro() {
        this.setState({modalErro: false})
    }

    preencherTabela() {
        var cliente = this.props.clientesDados.clientList;
        if (cliente !== null) {
            var renderListCliente = [];
            if (cliente.length > 0) {


                for (var i = this.props.clientesDados.inicioPaginacao; i < this.props.clientesDados.fimPaginacao; i++) {
                    if (cliente[i] === undefined) {
                        break;
                    }
                    renderListCliente[i] = (

                        <tr>
                            <td>{(i + 1)}</td>
                            <td>{cliente[i].nome}</td>
                            <td>{cliente[i].cpf}</td>
                            <td>{cliente[i].telefone}</td>
                            <td className="actions">
                                <button className="btn btn-success btn-sm" onClick={(event) => this.visualisarModal(event)} value={i} >Visualizar</button>
                                <button className="btn btn-warning btn-sm" onClick={(event) => this.editarDados(event)} value={i}>Editar</button>
                                <button className="btn btn-danger btn-sm" value={i} onClick={(event) => this.excluirCliente(event)}  >Excluir</button>
                            </td>
                        </tr>

                    )

                }
            } else {
                renderListCliente[0] = (

                    <tr>
                        <td></td>
                        <td></td>
                        <td> <h5> Não há clientes cadastrados </h5> </td>
                        <td></td>
                        <td>

                        </td>
                    </tr>

                )
            }
            this.renderConteudoTabela(renderListCliente)
        }
    }
    
    excluirCliente(e) {
        const posicaoCliente =  e.target.value
        const cliente = this.props.clientesDados.clientList[posicaoCliente]
        const clienteASerExcluido = {
            id: cliente._id
        }
        this.setState({modalAviso: true, mensagemModal: 'Tem certeza que deseja excluir esse cliente!', btnConfirmacao: true}, () => {
            var interval = setInterval(() => {
                if(this.state.confirmarOperacao !== null){
                    clearInterval(interval)
                    this.setState({modalAviso: false}, () => {
                        if(this.state.confirmarOperacao){
                            console.log(this.state.confirmarOperacao)
                        
                            axios.post('http://localhost:3001/clientes/remover', clienteASerExcluido)
                            .then((excluido) => {
                                if(excluido.data.erro) {
                                    this.setState({modalErro: true, mensagemModal: excluido.data.mensagem})
                                }else{
                                    this.setState({modalSucesso: true, mensagemModal: excluido.data.mensagem})
                                    setTimeout(() => {
                                        window.location.href = 'http://localhost:3000/clientes'
                                    }, 500)
                                }
                            }, (erro) => {

                            })
                            
                        }
                        this.setState({confirmarOperacao: null})
                    })
                }
                
            }, 400)
        })
        
        
    
    }

    confirmarOperacao(decisao) {
        this.setState({confirmarOperacao: decisao})
    }

    change(e) {
        console.log(e.target.value)
        var select = "[name='" + e.target.name + "']"
        console.log('select: ' + select)
        console.log(document.querySelector(select).value)
    }

    EditarModal() {
        if (this.state.varEdiModal !== null) {
            var armazenaClienteEditado = this.state.varEdiModal
            console.log(armazenaClienteEditado);
            return (
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal15} toggle={() => this.toggleModalEditar()} className="modal-lg">
                        <MDBModalHeader className='warning-color text-warning'>a</MDBModalHeader>
                            <MDBModalBody className='barra_rolagem'>
                                <fieldset class="scheduler-border"><legend class="scheduler-border"><h1>Editar Cliente</h1></legend>
                                    <fieldset id="usuario" class="scheduler-border"><legend class="scheduler-border">Editar Informações</legend>
                                        <p>Nome <input type="text" name="nome" id="iNome" value='teste' onChange={(event) => this.change(event)} /> </p>
                                        <p>CPF <input type="text" name="cpf" id="icpf" placeholder={armazenaClienteEditado.cpf} /> </p>
                                        <p>RG <input type="text" name="rg" id="iRG" placeholder={armazenaClienteEditado.rg} /></p>
                                        <p>Telefone  <input type="text" name="telefone" id="iTelefone" placeholder={armazenaClienteEditado.telefone} /></p>
                                        <p>E-mail <input type="email" name="email" id="iemail" placeholder={armazenaClienteEditado.email} /></p>
                                    </fieldset>
                                    <fieldset id="Endereco" class="scheduler-border"><legend class="scheduler-border">Editar Endereco</legend>
                                        <p>Bairro <input type="text" name="bairro" id="ibairro" placeholder={armazenaClienteEditado.endereco.bairro} /></p>
                                        <p>Rua <input type="text" name="rua" id="irua" placeholder={armazenaClienteEditado.endereco.rua} /></p>
                                        <p>Numero <input type="number" name="numero" id="inume" placeholder={armazenaClienteEditado.endereco.numero} /></p>
                                        <p>Cidade <input type="text" name="cidade" id="icidade" placeholder={armazenaClienteEditado.endereco.cidade} /></p>
                                        <p>CEP <input type="text" name="cep" id="icpf" placeholder={armazenaClienteEditado.endereco.cep} /></p>
                                        <p>Ponto de referencia <br /> <textarea name="pontoReferencia" id="ipontoReferencia" rows="10" placeholder={armazenaClienteEditado.endereco.pontoReferencia} ></textarea></p>
                                    </fieldset>
                                </fieldset>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="warning" type="submit" >Editar</MDBBtn>
                            </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            )
        }
    }
    //EditarModal

    //VisualisarModal
    Modal() {
        if (this.state.varModal !== null) {
            var armazenaCliente = this.state.varModal
            console.log(armazenaCliente);
            return (
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal14} toggle={() => this.toggleModalVisual()} className="modal-lg">
                        <MDBModalHeader className='primary-color text-white'><h1>Cliente</h1></MDBModalHeader>
                        <MDBModalBody className='barra_rolagem'>
                            <h2>Informações</h2>
                            <hr />
                            <MDBInput label="Nome" icon="user" value={armazenaCliente.nome}/>
                            <MDBInput disabled label="CPF" icon="address-card" value={armazenaCliente.cpf}/>
                            <MDBInput disabled label="RG" icon="address-book" value={armazenaCliente.rg}/>
                            <MDBInput disabled label="Telefone" icon="phone" value={armazenaCliente.telefone} />
                            <MDBInput disabled label="E-Mail" icon="envelope" value={armazenaCliente.email}/>
                            
                             <h2>Endereço</h2>
                             <hr />
                            <MDBInput disabled label="Bairro" icon="map-marker" value={armazenaCliente.endereco.bairro} />
                            <MDBInput disabled label="Rua" icon="road" value={armazenaCliente.endereco.rua}/>
                            <MDBInput disabled label="Numero" icon="home" value={armazenaCliente.endereco.numero}/>
                            <MDBInput disabled label="Cidade" icon="city" value={armazenaCliente.endereco.cidade}/>
                            <MDBInput label="CEP" icon='map-marked-alt' value={armazenaCliente.endereco.cep} />
                            <MDBIcon icon="street-view" className='fa-2x' /> &nbsp; <label>Ponto de referência</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"value={armazenaCliente.endereco.pontoReferencia}/>


                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={() => this.toggleModalVisual()}>Sair</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            )
        }
    }
    //VisualisarModal
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
        if (this.props.clientesDados.paginaAtual === 1) {
            classAnterior = 'page-item ' + this.state.estiloBotaoMudarPagina
        } else {
            classAnterior = 'page-item'
        }

        if (this.state.qtdPaginas === this.props.clientesDados.paginaAtual) {
            classProximo = 'page-item ' + this.state.estiloBotaoMudarPagina
        } else {
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
                                <button className="btn btn-primary btn-sm" id="gambiarra"> <MDBIcon icon="plus" />   NOVO</button>
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
                {this.Modal()}
                {this.EditarModal()}

                <ModalAviso decidir={(decisao) => this.confirmarOperacao(decisao)} modal={this.state.modalAviso} btnConfirmacao={this.state.btnConfirmacao}  mensagem={this.state.mensagemModal} />
                <ModalErro toggle={this.toggleModalErro} modal={this.state.modalErro} mensagem={this.state.mensagemModal}/>
                <ModalSucesso modal={this.state.modalSucesso} mensagem={this.state.mensagemModal} />
            </div>
        )
    }
}

export default clientes