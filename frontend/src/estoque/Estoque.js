import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Estoque extends Component {

    render(){
        return(
            <div>
                <h1>Produtos</h1>
                <Link to='estoque/novo'>
                    <button>Cadastrar produto</button>
                </Link>
            </div>
        );
    }
}

export default Estoque;