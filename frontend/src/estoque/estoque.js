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
    const serial = obj.id.data._id;

    var conteudo =
        `<form>
            <input />
        </form>`;

    modal('conteudo', conteudo, () => {
        

    });
}

function excluirProd(obj) {

    modal('confirmacao', 'Tem certeza que deseja excluir este produto?', () => {
        const serial = obj.id.data._id;
        console.log(serial);
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
        <tr>
            <td>{props.data.codigo}</td>
            <td>{props.data.nome}</td>
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
                <input className="form-control form-control-sm ml-2" type="text" placeholder="Pesquisar" aria-label="Search" autoFocus />
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
            const produto = <Produto key={key} data={data[key]} />;
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