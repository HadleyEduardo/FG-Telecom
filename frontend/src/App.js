import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./header/Header"
import Menu from './menuLateral/menu-lateral'
import Container from './container/container'
import Rotas from './router'
import {BrowserRouter as Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Route>
        <div className="App">
            <Header />
            <Menu />
            <Container>
              <Rotas />
            </Container>
        </div>
      </Route>
    );
  }
}

export default App;
