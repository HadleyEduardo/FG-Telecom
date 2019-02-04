import React, { Component } from 'react';
import './App.css';
import Header from "./header/Header"
import Menu from './menuLateral/menu-lateral'
import Container from './container/container'
import Rotas from './router'
import {BrowserRouter as Route} from 'react-router-dom'
import perfilHadlei from './imagens/seu-Hadlei.png'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      styleDropdown: {
        visibility: 'hidden'
      },
      sizeInput: 40,
      toggleMenu: false,
      loginIconLarge: null,
      loginIconMobile: null, 
      style: {
        visibility: 'visible'
      },
      estadosDoContainer: {
        idBoxContainer: 'box-estado-normal',
        idContainer:  'container-estado-normal'
      },
      clientesDados: {
        clientList: null,
        inicioPaginacao: 0,
        fimPaginacao: 2,
        qtdContatosPorPagina: 2,
        paginaAtual: 1
      },
      estoqueDados: {
        modelos: null
      }
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.estadoDoMenu = this.estadoDoMenu.bind(this)
    this.estadoDoContainer = this.estadoDoContainer.bind(this)
    this.widthScreenMobileDevice = this.widthScreenMobileDevice.bind(this)
    this.guardandoDadosLocalmente = this.guardandoDadosLocalmente.bind(this)
    this.controlarPaginacaoCliente = this.controlarPaginacaoCliente.bind(this)
  }

  componentWillMount(){
    var addEvent = function(elem, type, eventHandle) {
      if (elem == null || typeof(elem) == 'undefined') return;
      if ( elem.addEventListener ) {
          elem.addEventListener( type, eventHandle, false );
      } else if ( elem.attachEvent ) {
          elem.attachEvent( "on" + type, eventHandle );
      } else {
          elem["on"+type]=eventHandle;
      }
    };
    this.windowResize(addEvent)
    this.widthScreenMobileDevice()
  }

  toggleMenu(){
    this.setState({toggleMenu: !this.state.toggleMenu}, () => {
      this.estadoDoMenu()
      this.estadoDoContainer()
    })
  }

  windowResize(addEvent){
    var widthMobile = () => {
      return this.widthScreenMobileDevice()
    }
    addEvent(window, "resize", () => {
      widthMobile()  
    });
  }

  estadoDoContainer(){
    if(this.state.toggleMenu){
      this.setState({estadosDoContainer: {
        idBoxContainer: 'box-estado-large',
        idContainer: 'container-estado-large'
      }})
    }else{
      this.setState({estadosDoContainer: {
        idBoxContainer: 'box-estado-normal',
        idContainer: 'container-estado-normal'
      }})
    }
  }

  estadoDoMenu(){
    if(this.state.toggleMenu){
      this.setState({style: {
        visibility: 'hidden'
      }})
    }else{
      this.setState({style: {
        visibility: 'visible'
      }})
    }
  }

  widthScreenMobileDevice(){
    var width = window.innerWidth;
    if(width < 601){
      if(width < 490){
        this.setState({sizeInput: 30})
      }
      if(width < 350){
        this.setState({sizeInput: 25})
      }
      if(this.state.toggleMenu === false){
        this.setState({toggleMenu: true}, () => {
          this.estadoDoMenu()
          this.estadoDoContainer()
        })
      }
      this.setState({loginIconLarge: null, loginIconMobile: (
        <div>
          <div id='icon-login-mobile'>
            <div id='photo-mobile'>
                <img id="photo-perfil-mobile" style={{borderRadius: '100px'}} width='39px' height='39px' src={perfilHadlei} />
            </div>
            &nbsp;
            <div id='caret-icon-mobile'>
                <br />
                <i className="fas fa-caret-down"></i>
            </div>
          </div>
            <div id='div-do-nome-usuario'>
              <p id="nome-do-usuario">Hadlei Garcia</p>
              <p id="tipo-de-usuario">Administrador</p>
            </div>
          <hr />
        </div>
        )})
    }else{
      if(width > 490){
        this.setState({sizeInput: 40})
      }
      if(this.state.toggleMenu === true){
        this.setState({toggleMenu: false}, () => {
          this.estadoDoMenu()
          this.estadoDoContainer()
        })
      }
      
      this.setState({loginIconLarge: (
        <div>
          <a href='' onClick={(e) => this.dropdownToggle(e)}>
            <div id='icon-login'>
              <div id='photo'>
                  <img id="photo-perfil" style={{borderRadius: '100px'}} src={perfilHadlei} />
              </div>
              &nbsp;
              <div id='caret-icon'>
                  <br />
                  <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </a>
          <div style={this.state.styleDropdown} id='dropdown'>
            <i className="fas fa-sign-out-alt"></i> <b> Sair </b>
          </div>
        </div>
      ), loginIconMobile: null})
    }
    
  }

  dropdownToggle(e){
    e.preventDefault()
    if(this.state.styleDropdown.visibility === 'hidden'){
      this.setState({styleDropdown: {
        visibility: 'visible'
      }}, () => {
        this.widthScreenMobileDevice()
      }, false)
    }else{
      this.setState({styleDropdown: {
        visibility: 'hidden'
      }}, () => {
        this.widthScreenMobileDevice()
      })
    }
  }

  guardandoDadosLocalmente(dados) {
    var clientesDados = this.state.clientesDados
    clientesDados.clientList = dados
    this.setState({clientesDados: clientesDados})
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
    this.setState({estoqueDados})
  }

  render() {
    return (
      <Route>
        <div className="App">
            <Header loginIcon={this.state.loginIconLarge} toggleMenu={() => this.toggleMenu()}/>
            <Menu loginIcon={this.state.loginIconMobile} style={this.state.style} />
            <Container id={this.state.estadosDoContainer}>
              <Rotas estoqueDados={this.state.estoqueDados} pegandoDadosModeloEstoque={(dados) => this.pegandoModeloServidor(dados)} pegandoDadosServidor={(dados) => this.guardandoDadosLocalmente(dados)} controlarPaginacaoCliente={(pagina) => this.controlarPaginacaoCliente(pagina)} clientesDados={this.state.clientesDados} sizeInput={this.state.sizeInput}/>
            </Container>
        </div>
      </Route>
    );
  }
}

export default App;
