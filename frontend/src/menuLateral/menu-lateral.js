import React, {Component} from 'react'
import './menu-lateral.css'
import { Link } from 'react-router-dom'

class menu extends Component{

    ativarMenu(idMenu, id_li){
        document.querySelector('div.ativo').className = ''
        document.querySelector('li.liAtivo').className =''
        document.querySelector(idMenu).className = 'ativo'
        document.querySelector(id_li).className = 'liAtivo'
    }

    render(){
        return(
            <div style={this.props.style} id='menu-lateral'>
                {this.props.loginIcon}
                <br />
                <nav>
                    <ul>
                        <Link className='text-decoration-none' to='/'  onClick={() => this.ativarMenu('#agenda', '#liAgenda')}>
                            <div id='agenda' className='ativo'></div> <li className='liAtivo' id='liAgenda'> <i class="far fa-calendar-alt fa-lg"></i> &nbsp; <span> AGENDA </span> </li>
                        </Link>
                        <Link className='text-decoration-none' to='/vendas' onClick={() => this.ativarMenu('#venda', '#liVenda')}>
                            <div id='venda'></div> <li id='liVenda'> <i class="fas fa-shopping-cart fa-lg"></i> &nbsp; <span> VENDAS </span> </li>
                        </Link>
                        <Link className='text-decoration-none' to='/estoque' onClick={() => this.ativarMenu('#estoque', '#liEstoque')}> 
                            <div id='estoque'></div><li id='liEstoque'> <i class="fas fa-box-open fa-lg"></i> &nbsp; <span> ESTOQUE </span> </li>
                        </Link>
                        <Link className='text-decoration-none' to='clientes' onClick={() => this.ativarMenu('#cliente', '#liCliente')}>
                            <div id='cliente'></div> <li id='liCliente'> <i class="fas fa-users fa-lg"></i> &nbsp; <span> CLIENTES </span> </li>
                        </Link>
                        <Link className='text-decoration-none' to='ordem-de-servico' onClick={() => this.ativarMenu('#ordemServico', '#liOrdemServico')}>
                            <div id='ordemServico'></div> <li id='liOrdemServico'> <i class="fas fa-toolbox fa-lg"></i> &nbsp; <span> ORDEM DE SERVIÇO </span> </li>
                        </Link>
                        <Link className='text-decoration-none' to='funcionarios' onClick={() => this.ativarMenu('#funcionarios', '#liFuncionarios')}>
                            <div id='funcionarios'></div> <li id='liFuncionarios'> <i class="fas fa-user-tie fa-lg"></i> &nbsp; <span> FUNCIONARIOS </span> </li>
                        </Link>
                        <Link className='text-decoration-none' to='ajuda' onClick={() => this.ativarMenu('#ajuda', '#liAjuda')}>
                            <div id='ajuda'></div> <li id='liAjuda'> <i class="fas fa-question-circle fa-lg"></i> &nbsp; <span> AJUDA </span> </li>
                        </Link>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default menu