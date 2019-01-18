import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class clientes extends Component{

    render(){
        return(
            <div>
                <h1>CLIENTES</h1>
                <Link to='/clientes/novo'>
                    <button>Cadastrar cliente</button>
                </Link>
            </div>
        )
    }
}

export default clientes