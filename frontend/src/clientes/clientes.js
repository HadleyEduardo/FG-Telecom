import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './clientes.css';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBIcon, MDBBtn } from "mdbreact";


class clientes extends Component {

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-4"></div> {/**/}
                        <div className="col-4 justify-content-center">
                            <form className="form-inline mt-4 mb-4">
                                <MDBIcon icon="search" />
                                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>

                        <div className="col-4">
                            <Link to='/clientes/novo'>
                                <button className="btn btn-primary btn-sm" id="gambiarra">+</button>
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
                                        <th>CADASTRADO</th>
                                        <th className="actions">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>01</td>
                                        <td>Hadley Eduardo Louveira Garcia</td>
                                        <td>009.052.711-90</td>
                                        <td>01/01/2015</td>
                                        <td class="actions">
                                            <button className="btn btn-success btn-sm" >Visualizar</button>
                                            <button className="btn btn-warning btn-sm" >Editar</button>
                                            <button className="btn btn-danger btn-sm"  >Excluir</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className='row'>
                    <div className='col-3'>
                        <div id="paginacao">
                            <div aria-label="Page navigation example">
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