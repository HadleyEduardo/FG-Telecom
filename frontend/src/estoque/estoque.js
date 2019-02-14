import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';

const Tabela = (props) => {
    return (
        <MDBTable>
            <MDBTableHead>
                <tr>
                    <th>Código de Barras</th>
                    <th>Nome do Produto</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody id="tabela"></MDBTableBody>
        </MDBTable>
    );
}

class estoque extends Component {
    componentWillMount() {
        this.props.rotaAtual('estoque')
        this.requisicao();
    }

    jaFoi(tupla) {
        var jaForam = document.querySelectorAll('tr#produto');
        for(var j = 0; j < jaForam.length; ++j) {
            if(jaForam[j].innerHTML === tupla.innerHTML) {
                return true;
            }
        }
        return false;
    }

    getDados(res) {
        var dados = res;
        var tabela = document.getElementById('tabela');

        for(var i = 0; i < dados.length; ++i) {
            var tupla = document.createElement('tr');
            tupla.setAttribute('id', 'produto');
            
            var codigo = document.createElement('td');
            var nome = document.createElement('td');
            var marca = document.createElement('td');
            var modelo = document.createElement('td');
            
            codigo.innerHTML = dados[i].codigo;
            nome.innerHTML = dados[i].nome;
            marca.innerHTML = dados[i].marca;
            modelo.innerHTML = dados[i].modelo;
            
            tupla.appendChild(codigo);
            tupla.appendChild(nome);
            tupla.appendChild(marca);
            tupla.appendChild(modelo);
            
            if(this.jaFoi(tupla)) {
                continue;
            }

            tabela.appendChild(tupla);
        }
    }

    requisicao() {
        axios.get('http://localhost:3001/estoque/produto')
        .then(response => this.getDados(response.data))
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <Link to='/estoque/novo-item'>
                    <MDBBtn color="success">Cadastrar produtos no estoque</MDBBtn>
                </Link>
                <Tabela />
            </div>
        )
    }
}

export default estoque