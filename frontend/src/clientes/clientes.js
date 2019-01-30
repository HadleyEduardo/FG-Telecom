import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './clientes.css';

class clientes extends Component {

    render() {
        return (
            <div className='container'>
                <table className='table table-striped'>
                    <tr>
                        <td>a</td>
                        <td>b</td>
                        <td>c</td>
                    </tr>
                    <tr>
                        <td>nome</td>
                        <td>cpf</td>
                        <td>
                            <div className='row'>
                                <div className='col-xs-12'>
                                    <button style={{padding: '-10px'}} className='btn btn-primary btn-sm'>visualizar</button>
                                    <button style={{padding: '-10px'}} className='btn btn-warning btn-sm'>editar</button>
                                    <button style={{padding: '-10px'}} className='btn btn-danger btn-sm'>excluir</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default clientes