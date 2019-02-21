import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDataTable } from 'mdbreact';
import axios from 'axios';
import './estoque.css';

const DatatablePage = (dados) => {
    return (
        <MDBDataTable
            striped
            bordered
            hover
            data={dados}
        />
    );
}

class estoque extends Component {
    componentDidMount() {
        this.requisicao();
    }

    getDados(res) {
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
            rows: [
                res.data
            ]
        };

        ReactDOM.render(<DatatablePage dados={dados} />, document.querySelector('div#tabela'));
    }

    requisicao() {
        axios.get('http://localhost:3001/estoque/produto')
            .then(response => {
                this.getDados(response)
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
                    {/* tentei inserir a tabela aqui com ReactDOM */}
                </div>
            </div>
        )
    }
}

export default estoque;