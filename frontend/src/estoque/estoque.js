import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class estoque extends Component {

    render() {
        return (
            <div className="container">
                <Link to='/estoque/novo-item'>
                    <button>cadastar itens no estoque</button>
                </Link>
            </div>
        )
    }
}

export default estoque