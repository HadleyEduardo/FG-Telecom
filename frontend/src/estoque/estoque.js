// wWWWw               wWWWw                    eh um dia lindo la fora
// vVVVv (___) wWWWw         (___)  vVVVv       
// (___)  ~Y~  (___)  vVVVv   ~Y~   (___)       passaros cantando...
//  ~Y~   \|    ~Y~   (___)    |/    ~Y~        flores desabrochando...
//  \|   \ |/   \| /  \~Y~/   \|    \ |/        
// \\|// \\|// \\|/// \\|//  \\|// \\\|///      dia perfeito pra programar
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import './estoque.css';
import modal from './../modais/manipulandoModal';

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
                        <input type='hidden' name='vazio' value="${obj.id.data._id}" /> </p>
                        <input class="inputsEditar" type="text" name="codigo" id="codigo" value="${obj.id.data.codigo}" /> 
                        <input class="inputsEditar" type="text" name="nome" id="nome" value="${obj.id.data.nome}" /> 
                        <input class="inputsEditar" type="text" name="marca" id="marca" value="${obj.id.data.marca}" /> 
                        <input class="inputsEditar" type="text" name="modelo" id="modelo" value="${obj.id.data.modelo}" /> 
                    </div>
                </div>
            </fieldset>
        </fieldset>
    </form>
    `;

    modal('conteudo', conteudo, event => {
        event.preventDefault();
        const codigo = document.querySelector('input.inputsEditar#codigo').value;
        const nome = document.querySelector('input.inputsEditar#nome').value;
        const marca = document.querySelector('input.inputsEditar#marca').value;
        const modelo = document.querySelector('input.inputsEditar#modelo').value;
        // TODO: back-end aqui
        
    }, 'editar');
}

function excluirProd(obj) {
    modal('confirmacao', 'Tem certeza que deseja excluir este produto?', () => {
        const serial = obj.id.data._id;
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
            <td id={props.data.id}>{props.data.codigo}</td>
            <td className={'nomes'}>{props.data.nome}</td>
            <td>{props.data.marca}</td>
            <td>{props.data.modelo}</td>
            <td><Crud id={props} /></td>
        </tr>
    );
}

const SearchPage = () => {
    return (
        <MDBCol md="5" xs="3">
            <form className="form-inline mt-4 mb-4">
                <MDBIcon icon="search" />
                <input
                className="form-control form-control-sm ml-2"
                type="text"
                placeholder="Pesquisar"
                aria-label="Search"
                autoFocus
                onChange={() => {
                    // pesquisa produtos
                    var inputValue = document.querySelector('input.form-control.form-control-sm.ml-2').value;
                    

                    var nomes = document.querySelectorAll('td.nomes');

                    for (var k = 0; k < nomes.length; ++k) {
                        var str = nomes[k].innerHTML;
                        if (str.search(inputValue) != 0) {
                            nomes[k].style.display = 'none';
                        } else {
                            nomes[k].style.display = 'block';
                        }
                    }
                }}/>
            </form>
        </MDBCol>
    );
}

const BasicTable = props => {
    return (
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
            <MDBTableBody>
                {/* produtos aqui */}
            </MDBTableBody>
        </MDBTable>
    );
}

class estoque extends Component {
    componentDidMount() {
        this.requisicao();
    }

    getDados(data) {
        const obj = [];

        for (var key in data) {
            const produto = <Produto key={key} id={key} data={data[key]} />;
            obj[key] = produto;
        }

        ReactDOM.render(obj, document.querySelector('tbody'));
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
                <MDBRow>
                    <MDBCol sm="12">
                        <h2>Estoque</h2>
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

                <BasicTable />

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