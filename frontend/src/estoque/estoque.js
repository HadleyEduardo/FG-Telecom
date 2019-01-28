import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class estoque extends Component{

    render(){
        return(
            <div>
                <h1>ESTOQUE</h1>
                <Link to='/estoque/novo-item'>
                    <button>cadastrar novo</button>
                </Link>
                <Link to='/estoque/novo-modelo'>
                    <button>cadastrar novo modelo</button>
                </Link>
            </div>
        )
    }
}

export default estoque