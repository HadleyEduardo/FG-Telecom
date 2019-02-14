import React, { Component } from 'react';
import './App.css';
import Header from "./header/Header"
import Menu from './menuLateral/menu-lateral'
import Container from './container/container'
import Rotas from './router'
import { BrowserRouter as Route } from 'react-router-dom'
import modal from './modais/manipulandoModal'
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sizeInput: 40,
      clientesDados: {
        clientList: null,
        inicioPaginacao: 0,
        fimPaginacao: 9,
        qtdContatosPorPagina: 9,
        paginaAtual: 1,
        clienteSelecionado: null,
        filtro: ''
      },
      estoqueDados: {
        modelos: null
      },
      headerEmSegundoPlano: false,
      rotaAtual: '',
      modais: {
        nome: null,
        typeModal: '',
        mensagem: '',
        decisao: null,
        btnConfirmacao: null,
      }
    }
    this.guardandoDadosLocalmente = this.guardandoDadosLocalmente.bind(this)
    this.controlarPaginacaoCliente = this.controlarPaginacaoCliente.bind(this)
    this.settarRota = this.settarRota.bind(this)
  }


  settarRota(rota) {
    if (this.state.rotaAtual !== rota) {
      this.setState({ rotaAtual: rota })
    }
  }

  componentWillMount() {
    var addEvent = function (elem, type, eventHandle) {
      if (elem == null || typeof (elem) == 'undefined') return;
      if (elem.addEventListener) {
        elem.addEventListener(type, eventHandle, false);
      } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, eventHandle);
      } else {
        elem["on" + type] = eventHandle;
      }
    };
  }  

  guardandoDadosLocalmente(dados) {
    var clientesDados = this.state.clientesDados
    clientesDados.clientList = dados
    this.setState({ clientesDados: clientesDados })
  }

  controlarPaginacaoCliente(pagina) {
    var qtd = this.state.clientesDados.qtdContatosPorPagina * pagina
    var inicioPaginacao = qtd - this.state.clientesDados.qtdContatosPorPagina
    var fimPaginacao = qtd
    var clientesDados = this.state.clientesDados
    clientesDados.inicioPaginacao = inicioPaginacao
    clientesDados.fimPaginacao = fimPaginacao
    clientesDados.paginaAtual = pagina
    this.setState({ clientesDados })
  }

  pegandoModeloServidor(dados) {
    var estoqueDados = this.state.estoqueDados
    estoqueDados.modelos = dados
    this.setState({ estoqueDados })
  }

  pegarInfoParaModal(modais) {
    this.setState({ modais: modais }, () => {
      console.log(this.state.modais)
    })
  }

  selecionarCLiente(cliente) {
    this.setState({ clientesDados: { ...this.state.clientesDados, clienteSelecionado: cliente } })
  }

  salvarFiltro(filtro) {
    this.setState({clientesDados: {...this.state.clientesDados, filtro}})
  }

  render() {
    modal()
    return (
      <Route>
        <div id="App">
          <Menu rotaAcessada={this.state.rotaAtual} />
          <Header />
          <Container id={this.state.estadosDoContainer}>
          
            <div>
              <Rotas
                rotaAtual={(rota) => this.settarRota(rota)}
                estoqueDados={this.state.estoqueDados}
                pegandoDadosModeloEstoque={(dados) => this.pegandoModeloServidor(dados)}
                pegandoDadosServidor={(dados) => this.guardandoDadosLocalmente(dados)}
                controlarPaginacaoCliente={(pagina) => this.controlarPaginacaoCliente(pagina)}
                clientesDados={this.state.clientesDados}
                sizeInput={this.state.sizeInput}
              />

            </div>
          </Container>
          
      
          <div>
            <MDBContainer>
              <MDBModal id='modalApp' isOpen={true} toggle={this.toggle}>
                  <MDBModalHeader id='modal-header' toggle={this.toggle}>MDBModal title</MDBModalHeader>
                  <form id='form'>
                  <MDBModalBody id='modal-body'>
                  (...)
                  </MDBModalBody>
                  <MDBModalFooter id='modal-footer'>
                    
                  </MDBModalFooter>
                  </form>
              </MDBModal>
            </MDBContainer>
          </div>
        </div>
      </Route>
    );
  }
}

export default App;
