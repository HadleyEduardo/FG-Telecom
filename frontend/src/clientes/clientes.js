import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './clientes.css';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBIcon, MDBBtn } from "mdbreact";
import axios from 'axios';

class clientes extends Component {
    constructor() {
        super();
        this.state = {
            listaClientes: [],
            RenderConteudo: () => {

            }
        };
    }
    componentWillMount() {
        axios.get('http://localhost:3001/clientes')
            .then((res) => {
                const client = res.data;
                this.setState({ listaClientes: client }, () => {
                    this.preencherTabela()
                });
            })

    }
    preencherTabela() {

        var cliente = this.state.listaClientes;
        var renderListCliente = [];
        for (var i = 0; i < cliente.length; i++) {

            renderListCliente[i] = (

                <tr>
                    <td>{(i + 1)}</td>
                    <td>{cliente[i].nome}</td>
                    <td>{cliente[i].cpf}</td>
                    <td>{cliente[i].telefone}</td>
                    <td class="actions">
                        <button className="btn btn-success btn-sm" >Visualizar</button>
                        <button className="btn btn-warning btn-sm" >Editar</button>
                        <button className="btn btn-danger btn-sm"  >Excluir</button>
                    </td>
                </tr>

            )

        }
        this.renderConteudoTabela(renderListCliente)
    }

    renderConteudoTabela(conteudo) {
        this.setState({
            RenderConteudo: () => {
                return conteudo.map((tr) => {
                    return tr
                })
            }
        })

    }

    render() {
        return (
            <div>
                <div className="container">
                    
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h2 style={{textAlign: 'center'}}>Clientes</h2>
                        </div>
                    </div>
                    
                    
                    <br />
                    
                    <div className="row">

                        <div className="col-sm-3 col-xs-0"></div>
                    
                        <div className="col-sm-5 col-xs-3">
                            <form className="form-inline mt-1 mb-5">
                                <MDBIcon icon="search" />
                                <input style={{width: '80%'}} className="form-control form-control-sm ml-2" type="text" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>

                        <div className="col-sm-2 col-xs-0"></div>

                        <div className="col-sm-2 col-xs-1">
                            <Link to='/clientes/novo'>
                                <button className="btn btn-primary btn-sm" id="gambiarra">+ novo</button>
                            </Link>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='table-responsive'>
                            <table className="table table-striped" cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Telefone</th>
                                        <th className="actions">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.RenderConteudo()}

                                </tbody>
                            </table>
                        </div>
                    </div>



                    <div className='row'>

                        <div className='col-lg-0 col-md-1 col-sm-2 col-sx-0'></div>

                        <div className='col-sm-2 col-md-2 col-lg-1 col-xs-1'>
                            <div aria-label="Page navigation">
                                <div class="pagination pg-blue justify-content-center">
                                    <div class="page-item disabled">
                                        <a class="page-link" tabindex="-1">Previous</a>
                                    </div>
                                    <div class="page-item active"><a class="page-link">1</a></div>
                                    <div class="page-item"><a class="page-link">2</a></div>
                                    <div class="page-item"><a class="page-link">3</a></div>
                                    <div class="page-item">
                                        <a class="page-link">Next</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default clientes
		
		