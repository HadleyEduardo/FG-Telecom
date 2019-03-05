// wWWWw               wWWWw                    eh um dia lindo la fora
// vVVVv (___) wWWWw         (___)  vVVVv       
// (___)  ~Y~  (___)  vVVVv   ~Y~   (___)       passaros cantando...
//  ~Y~   \|    ~Y~   (___)    |/    ~Y~        flores desabrochando...
//  \|   \ |/   \| /  \~Y~/   \|    \ |/        
// \\|// \\|// \\|/// \\|//  \\|// \\\|///      dia perfeito pra programar
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import './estoque.css';
import modal from './../modais/manipulandoModal';

var dados = []

function pesquisar() {
    var search = document.getElementById('pesquisa')
    
    var filtro = dados.map((prod) => {
        if (prod.nome.toLowerCase().search(search.value.toLowerCase()) === 0) 
            return <Produto dados={prod} key={prod._id} id={prod._id} />

    });

    ReactDOM.render(filtro, document.getElementById('tabela'));
}

const SearchPage = () => {
    return (
        <MDBCol md="5" xs="3">
            <form className="form-inline mt-4 mb-4">
                <MDBIcon icon="search" />
                <input className="form-control form-control-sm ml-2" id="pesquisa" type="text" placeholder="Pesquisar" aria-label="Search" autoFocus onChange={() => {
                    pesquisar();
                }}/>
            </form>
        </MDBCol>
    );
}

function editarProd(obj) {
    var conteudo =
    `
    <form>
        <fieldset class="scheduler-border">
            <legend class="scheduler-border">
                <h2>Editar Produto</h2>
            </legend>
            <fieldset id="produto" class="scheduler-border">
                <legend class="scheduler-border">editar informações</legend>
                <div class="row">
                    <div class="col-sm-2">
                        <label>Código do produto: </label><br />
                        <label>Nome do produto: </label><br />
                        <label>Marca: </label><br />
                        <label>Modelo: </label><br />
                    </div>
                    <div class="col-sm-10">
                        <input type='hidden' name='vazio' value="${obj.prod.dados._id}" /> </p>
                        <input class="inputsEditar" type="text" name="codigo" id="codigo" value="${obj.prod.dados.codigo}" /> 
                        <input class="inputsEditar" type="text" name="nome" id="nome" value="${obj.prod.dados.nome}" /> 
                        <input class="inputsEditar" type="text" name="marca" id="marca" value="${obj.prod.dados.marca}" /> 
                        <input class="inputsEditar" type="text" name="modelo" id="modelo" value="${obj.prod.dados.modelo}" /> 
                    </div>
                </div>
            </fieldset>
        </fieldset>
    </form>
    `;

    modal('conteudo', conteudo, event => {
        event.preventDefault();
        // TODO: back-end aqui
        
    }, 'editar');
}

function excluirProd(obj) {
    modal('confirmacao', 'Tem certeza que deseja excluir este produto?', () => {
        const serial = obj.prod.dados._id;
        // TODO: back-end aqui

    });
}

const Crud = props => {
    return (
        <Fragment>
            <MDBBtn color="warning" size="sm" onClick={() => editarProd(props)}>Editar</MDBBtn>
            <MDBBtn color="danger" size="sm" onClick={() => excluirProd(props)}>Excluir</MDBBtn>
        </Fragment>
    );
}

const Produto = props => {
    return (
        <tr className={'produtos'}>
            <td id={props.dados._id}>{props.dados.codigo}</td>
            <td>{props.dados.nome}</td>
            <td>{props.dados.marca}</td>
            <td>{props.dados.modelo}</td>
            <td><Crud prod={props} /></td>
        </tr>
    );
}

class estoque extends Component {
    componentDidMount() {
        this.req()
    }

    inserir() {
        return dados.map((prod) => {
            return <Produto dados={prod} key={prod._id} id={prod._id} />
        });
    }

    req() {
        axios.get('http://localhost:3001/estoque/produto')
            .then(response => {
                dados = response.data
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <div className="container">
                <MDBRow>
                    <MDBCol sm="12">
                        <h2 id="estoque">Estoque</h2>
                    </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                    <MDBCol sm="3" xs="0"></MDBCol>

                    <SearchPage />

                    <MDBCol sm="2" xs="0"></MDBCol>

                    <MDBCol sm="2" xs="1">
                        <Link to='/estoque/novo-item'>
                            <MDBBtn color="primary" className="btn btn-primary btn-sm" id="gamb">
                                <MDBIcon icon="plus" className="mr-1" /> novo
                            </MDBBtn>
                        </Link>
                    </MDBCol>
                </MDBRow>

                <MDBTable striped>
                    <MDBTableHead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ações</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody id="tabela">
                        {this.inserir()}
                    </MDBTableBody>
                </MDBTable>

                <MDBRow>
                    <MDBCol lg="0" md="1" sm="2" sx="0"></MDBCol>

                    <MDBCol lg="1" md="2" sm="2" xs="1">
                        {/* paginacao aqui */}
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default estoque;