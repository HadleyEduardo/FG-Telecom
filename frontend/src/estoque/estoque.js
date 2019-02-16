import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import axios from 'axios';
import './estoque.css';

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

const SearchPage = () => {
    return (
        <MDBCol sm="5" xs="3">
            <form className="form-inline mt-1 mb-4">
                <MDBIcon icon="search" />
                <input style={{width: '80%'}} className="form-control form-control-sm ml-2" type="text" placeholder="Pesquisar..." aria-label="Search" />
            </form>
        </MDBCol>
    );
}

class estoque extends Component {

    componentDidMount() {
        this.requisicao();
    }

    getDados(res) {
        var dados = res;
        console.log(dados);

        var tabela = document.getElementById('tabela');

        for (var i = 0; i < dados.length; ++i) {
            var tupla = document.createElement('tr');
            tupla.setAttribute('class', 'produto');

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
            tabela.appendChild(tupla);
        }
    }

    requisicao() {
        axios.get('http://localhost:3001/estoque/produto')
            .then(response => {
                this.getDados(response.data)
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <h2>estocao do seu Hadlei</h2>
                <br />
                <MDBRow>
                    <MDBCol sm="3" xs="0"></MDBCol>

                    <SearchPage />

                    <MDBCol sm="2" xs="0"></MDBCol>

                    <MDBCol sm="2" xs="1">
                        <Link to='/estoque/novo-item'>
                            <MDBBtn color="primary" className="btn btn-primary btn-sm">
                                <MDBIcon icon="plus" className="mr-1" /> novo
                            </MDBBtn>
                        </Link>
                    </MDBCol>
                </MDBRow>

                <Tabela />
            </div>
        )
    }
}

export default estoque