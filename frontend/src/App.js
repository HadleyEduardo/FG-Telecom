import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./header/Header"
import Menu from './menuLateral/menu-lateral'
import Container from './container/container'
import Rotas from './router'
import {BrowserRouter as Route} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggleMenu: false,
      style: {
        visibility: 'visible'
      },
      estadosDoContainer: {
        idBoxContainer: 'box-estado-normal',
        idContainer:  'container-estado-normal'
      }
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.estadoDoMenu = this.estadoDoMenu.bind(this)
    this.estadoDoContainer = this.estadoDoContainer.bind(this)
  }

  toggleMenu(){
    this.setState({toggleMenu: !this.state.toggleMenu})
    this.estadoDoMenu()
    this.estadoDoContainer()
  }

  estadoDoContainer(){
    if(!this.state.toggleMenu){
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
    if(!this.state.toggleMenu){
      this.setState({style: {
        visibility: 'hidden'
      }})
    }else{
      this.setState({style: {
        visibility: 'visible'
      }})
    }
  }

  render() {
    return (
      <Route>
        <div className="App">
            <Header toggleMenu={() => this.toggleMenu()}/>
            <Menu style={this.state.style} />
            <Container id={this.state.estadosDoContainer}>
              <Rotas />
            </Container>
        </div>
      </Route>
    );
  }
}

export default App;
