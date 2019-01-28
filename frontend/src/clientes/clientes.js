import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './clientes.css'; 

class clientes extends Component{

    render(){
        return(
            <div>
                <h1>Clientes</h1>
                <Link to='/clientes/novo'>
                    <button>Cadastrar cliente</button>
                </Link>
            </div>
        )
    }
}

export default clientes