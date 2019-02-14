import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './clientes.css';
import modal from '../modais/manipulandoModal'
import { MDBIcon, MDBBtn } from "mdbreact";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import axios from 'axios';

class clientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro: '',
            listaClientesFiltrada: [],
            modalSucesso: false,
            modalErro: false,
            modalAviso: false,
            modalConteudo: false,
            mensagemModal: '',
            conteudoModal: null,
            varEdiModal: null,
            modalEditar: false,
            typeModal: '',
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
        this.enviar = this.enviar.bind(this)
        this.fazerPaginacao = this.fazerPaginacao.bind(this)
        this.excluirCliente = this.excluirCliente.bind(this)
    }

    componentWillMount() {
        this.props.rotaAtual('clientes')
    }

    //Pesquisar na tabela clientes
    change(e) {
        this.setState({filtro: e.target.value }, () => {
            this.filtroDePesquisa()
        })
    }
    //Pesquisar na tabela clientes

    //EnviarEdição

    enviar(e) {

        e.preventDefault();//Impede o rediresionamento da pagina
        const form = {
            id: e.target.vazio.value,
            nome: e.target.nome.value,
            cpf: e.target.cpf.value,
            rg: e.target.rg.value,
            telefone: e.target.telefone.value,
            email: e.target.email.value,
            endereco: {
                rua: e.target.rua.value,
                numero: e.target.numero.value,
                bairro: e.target.bairro.value,
                cidade: e.target.cidade.value,
                cep: e.target.cep.value,
                pontoReferencia: e.target.pontoReferencia.value
            }
        }

        try {
            axios.post('http://localhost:3001/clientes/editar', form)
                .then((form) => {
                    if (form.data.erro) {
                        var mensagem = form.data.mensagem
                        modal('aviso', mensagem)
                    } else {
                        var mensagem = form.data.mensagem
                        modal('sucesso', mensagem)

                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/clientes'
                        }, 900)
                    }
                }, (erro) => {
                    var infoModal = {
                        nome: 'modalAviso',
                        mensagem: 'A conexão com a internet pode estar interrompida ou o servidor está com problemas',
                    }
                    this.props.infoModal(infoModal)
                })
                .catch((e) => {
                    var infoModal = {
                        nome: 'modalAviso',
                        //Coloquem o contato de vocês no final da mensagem, coloque '\n' seu nome, depois ':' e o numero!!!
                        mensagem: 'Ocorreu um erro grave ao tentar editar cliente! Se continuar Chame o suporte!\nTelefone: \nRafael Castro: 067 992359859',
                    }
                    this.props.infoModal(infoModal)
                })

        } catch (e) {
            console.log(e)
        }
    }
    //EnviarEdição

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    visualisarModal(i) {
        var armazenaCliente = this.props.clientesDados.clientList[i.target.value]
        var conteudo = `
                <div>
                    <h2>Informações</h2>
                    <hr />
                    <div class="md-form">
                        <i class="fas fa-user prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.nome}" disabled />
                        <label class='active' for="nome">Nome</label>
                    </div>
                    
                    <div class="md-form">
                        <i class="fas fa-address-card prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.cpf}" disabled />
                        <label class='active' for="nome">CPF</label>
                    </div>
                    
                    <div class="md-form">
                        <i class="fas fa-address-book prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.rg}" disabled />
                        <label class='active' for="nome">RG</label>
                    </div>

                    <div class="md-form">
                        <i class="fas fa-phone prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.telefone}" disabled />
                        <label class='active' for="nome">Telefone</label>
                    </div>

                    <div class="md-form">
                        <i class="fas fa-envelope prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.email}" disabled />
                        <label class='active' for="nome">Email</label>
                    </div>

                    <h2>Endereço</h2>
                    <hr />

                    <div class="md-form">
                        <i class="fas fa-map-marker prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.endereco.bairro}" disabled />
                        <label class='active' for="nome">Bairro</label>
                    </div>
                    
                    <MDBInput disabled label="Rua" icon="road" value={armazenaCliente.endereco.rua} />
                    <div class="md-form">
                        <i class="fas fa-road prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.endereco.rua}" disabled />
                        <label class='active' for="nome">Rua</label>
                    </div>
                    
                    <div class="md-form">
                        <i class="fas fa-home prefix"></i>
                        <input type="number" id="nome" class="form-control" value="${armazenaCliente.endereco.numero}" disabled />
                        <label class='active' for="nome">Número</label>
                    </div>
                    
                    <div class="md-form">
                        <i class="fas fa-city prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.endereco.cidade}" disabled />
                        <label class='active' for="nome">Cidade</label>
                    </div>

                    <div class="md-form">
                        <i class="fas fa-map-marked-alt prefix"></i>
                        <input type="text" id="nome" class="form-control" value="${armazenaCliente.endereco.cep}" disabled />
                        <label class='active' for="nome">CEP</label>
                    </div>

                    <i class="fas fa-street-view prefix fa-2x"></i> &nbsp; <label for='exampleFormControlTextarea1'>Ponto de referência</label> <br />
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" disabled> ${armazenaCliente.endereco.pontoReferencia} </textarea>
                </div>
            `
        modal('conteudo', conteudo, null, 'visualizar')
    }



    //Edição
    editarDados(i) {
        var armazenaClienteEditado = this.props.clientesDados.clientList[i.target.value]
        var conteudo = `
                <fieldset class="scheduler-border"><legend class="scheduler-border"><h1>Editar Cliente</h1></legend>
                    <fieldset id="usuario" class="scheduler-border"><legend class="scheduler-border">Editar Informações</legend>
                        <p> <input type='hidden' name='vazio' value="${armazenaClienteEditado._id}" /> </p>
                        <p>Nome <input class='inputsEditar' type="text" name="nome" id="iNome" value="${armazenaClienteEditado.nome}" /> </p>
                        <p>CPF <input type="text" name="cpf" class='inputsEditar' id="icpf" value="${armazenaClienteEditado.cpf}" /> </p>
                        <p>RG <input type="text" name="rg" id="iRG" class='inputsEditar' value="${armazenaClienteEditado.rg}" /></p>
                        <p>Telefone  <input type="text" name="telefone" id="iTelefone" class='inputsEditar' value="${armazenaClienteEditado.telefone}" /></p>
                        <p>E-mail <input type="email" name="email" id="iemail" class='inputsEditar' value="${armazenaClienteEditado.email}" /></p>
                    </fieldset>
                    <fieldset id="Endereco" class="scheduler-border"><legend class="scheduler-border">Editar Endereco</legend>
                        <p>Bairro <input class='inputsEditar' type="text" name="bairro" id="ibairro" value="${armazenaClienteEditado.endereco.bairro}" /></p>
                        <p>Rua <input type="text" name="rua" class='inputsEditar' id="irua" placeholder="${armazenaClienteEditado.endereco.rua}" /></p>
                        <p>Numero <input type="number" name="numero" id="inume" class='inputsEditar' value="${armazenaClienteEditado.endereco.numero}" /></p>
                        <p>Cidade <input type="text" name="cidade" id="icidade" class='inputsEditar' value="${armazenaClienteEditado.endereco.cidade}" /></p>
                        <p>CEP <input type="text" name="cep" id="icpf" class='inputsEditar' value="${armazenaClienteEditado.endereco.cep}" /></p>
                        <p>Ponto de referencia <br /> <textarea name="pontoReferencia" id="ipontoReferencia" rows="10" > ${armazenaClienteEditado.endereco.pontoReferencia} </textarea></p>
                    </fieldset>
                </fieldset>
            `
            var salvar = (event) => this.enviar(event)
            modal('conteudo', conteudo, (event) => salvar(event), 'editar')
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
                    // eslint-disable-next-line no-loop-func
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
        document.getElementById('search').focus()
    }

    //filtroDePesquisa
    filtroDePesquisa() {
        var clienteDigitado = this.props.clientesDados.clientList;
        var armazenaClienteDoFiltro = [];
        var controleIndice = 0;
        var nome;
        var armazenaFiltro

        if (clienteDigitado !== null) {
            console.log('aqui..................................')
            for (var i = 0; i < clienteDigitado.length; i++) {
                nome = clienteDigitado[i].nome.toLowerCase()
                armazenaFiltro = this.state.filtro.toLowerCase()
                if (nome.indexOf(armazenaFiltro) !== -1) {
                    armazenaClienteDoFiltro[controleIndice] = clienteDigitado[i]
                    armazenaClienteDoFiltro[controleIndice]['idTemporario'] = i
                    controleIndice++
                }
            }
            this.preencherTabela(armazenaClienteDoFiltro)
        }
    }
    //filtroDePesquisa

    preencherTabela(armazenaClienteDoFiltro = null) {
        var cliente = this.props.clientesDados.clientList;
        if (this.state.filtro !== '') {
            cliente = armazenaClienteDoFiltro
            if(cliente !== null && cliente !== undefined) {
                var renderListCliente = []
                
                if(cliente.length === 0){
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
                }else{

                    for (var i = 0; i < cliente.length; i++) {
                        if (cliente[i] === undefined) {
                            break;
                        }
                        renderListCliente[i] = (

                            <tr>
                                <td name='id'>{(cliente[i].idTemporario + 1)}</td>
                                <td>{cliente[i].nome}</td>
                                <td>{cliente[i].cpf}</td>
                                <td>{cliente[i].telefone}</td>
                                <td className="actions">
                                    <button className="btn btn-success btn-sm" onClick={(event) => this.visualisarModal(event)} value={cliente[i].idTemporario} >Visualizar</button>
                                    <button className="btn btn-warning btn-sm" onClick={(event) => this.editarDados(event)} value={cliente[i].idTemporario} >Editar</button>
                                    <button className="btn btn-danger btn-sm" value={cliente[i].idTemporario} onClick={(event) => this.excluirCliente(event)}  >Excluir</button>
                                </td>
                            </tr>

                        )

                    }
                }
                this.renderConteudoTabela(renderListCliente)
            }
        }

        if (cliente !== null && this.props.clientesDados.filtro === '') {
            var renderListCliente = [];
            if (cliente.length > 0) {


                for (var i = this.props.clientesDados.inicioPaginacao; i < this.props.clientesDados.fimPaginacao; i++) {
                    if (cliente[i] === undefined) {
                        break;
                    }
                    renderListCliente[i] = (

                        <tr>
                            <td name='id'>{(i + 1)}</td>
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
        const posicaoCliente = e.target.value
        const cliente = this.props.clientesDados.clientList[posicaoCliente]
        var clienteASerExcluido = {
            id: cliente._id
        }
        modal('confirmacao', 'Tem certeza que deseja excluir esse cliente!', confirmado)

        function confirmado() {
            axios.post('http://localhost:3001/clientes/remover', clienteASerExcluido)
                .then((excluido) => {
                    var mensagem = null
                    if (excluido.data.erro) {
                        mensagem = excluido.data.mensagem
                        modal('erro', mensagem) 
                    } else {
                        mensagem = 'escluido com sucesso' 
                        modal('sucesso', mensagem)
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/clientes'
                        }, 1000)
                    }
                }, (erro) => {

                })
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
                                <input style={{ width: '80%' }} className="form-control form-control-sm ml-2" type="text" placeholder="Pesquisar..." onChange={(e) => this.change(e)} id="search" value={this.state.filtro} />
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
                <div id='modal1'>

                </div>
            </div>
        )
    }
}

export default clientes