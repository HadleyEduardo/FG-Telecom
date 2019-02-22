import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDataTable } from 'mdbreact';
import axios from 'axios';
import './estoque.css';

const DatatablePage = (dados) => {
    const columns = dados.dados.columns;
    const linhas = dados.dados.rows;
    
    const codigo = linhas.map(linhas => linhas.codigo);
    const nome = linhas.map(linhas => linhas.nome);
    const marca = linhas.map(linhas => linhas.marca);
    const modelo = linhas.map(linhas => linhas.modelo);
    
    var rows = [];
    for(var i = 0; i < linhas.length; ++i) {
        const c = codigo[i];
        const n = nome[i];
        const m = marca[i];
        const m2 = modelo[i];

        const obj = {
            c,
            n,
            m,
            m2
        }

        rows[i] = obj;
    }

    const data = {
        columns,
        rows
    }

    return (
        <MDBDataTable
            striped
            bordered
            hover
            data={data}
        />
    );
}

class estoque extends Component {
    componentDidMount() {
        this.requisicao();
    }

    getDados(rows) {
        const dados = {
            columns: [
                {
                    label: 'Código',
                    field: 'codigo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Nome',
                    field: 'name',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Marca',
                    field: 'marca',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Modelo',
                    field: 'modelo',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows
        };

        ReactDOM.render(<DatatablePage dados={dados} />, document.querySelector('div#tabela'));
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
                <h2>Estoque</h2>
                <br />
                <MDBRow>
                    <MDBCol sm="10" xs="0"></MDBCol>

                    <MDBCol sm="2" xs="1">
                        <Link to='/estoque/novo-item'>
                            <MDBBtn color="primary" className="btn btn-primary btn-sm">
                                <MDBIcon icon="plus" className="mr-1" /> novo
                            </MDBBtn>
                        </Link>
                    </MDBCol>
                </MDBRow>
                
                <div id="tabela">
                </div>
            </div>
        )
    }
}

export default estoque;