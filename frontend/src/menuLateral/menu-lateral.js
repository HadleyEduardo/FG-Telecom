import React, {Component} from 'react'
import './menu-lateral.css'
import { Link } from 'react-router-dom'
import { MDBAnimation } from "mdbreact";

class menu extends Component{

    ativarMenu(idMenu, id_li){
        if(document.querySelector('div.ativo') && document.querySelector('li.liAtivo')) {
            document.querySelector('div.ativo').className = ''
            document.querySelector('li.liAtivo').className = ''
        }
        document.querySelector(idMenu).className = 'ativo'
        document.querySelector(id_li).className = 'liAtivo'
    }

    render(){
        if(this.props.style.visibility === 'hidden'){
            var animation = 'zoomOutLeft' 
        }else{
            var animation = null
        }
        var rota = this.props.rotaAcessada
        if(rota) {
            var idMenu = '#' + rota
            var idLi = '#li-' + rota
            this.ativarMenu(idMenu, idLi)
        }

        return(
            <MDBAnimation type={animation} duration="1000ms" delay='1s'>
                <div style={this.props.style} id='menu-lateral'>
                    {this.props.loginIcon}
                    <br />
                    <nav>
                        <ul>
                            <Link className='text-decoration-none' to='/'>
                                <div id='agenda'></div> <li id='li-agenda'> <i className="far fa-calendar-alt fa-lg"></i> &nbsp; <span> AGENDA </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/vendas'>
                                <div id='venda'></div> <li id='li-venda'> <i className="fas fa-shopping-cart fa-lg"></i> &nbsp; <span> VENDAS </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/estoque'> 
                                <div id='estoque'></div><li id='li-estoque'> <i className="fas fa-box-open fa-lg"></i> &nbsp; <span> ESTOQUE </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/clientes'>
                                <div id='clientes'></div> <li id='li-clientes'> <i className="fas fa-users fa-lg"></i> &nbsp; <span> CLIENTES </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/ordem-de-servico'>
                                <div id='ordemDeServico'></div> <li id='li-ordemDeServico'> <i className="fas fa-toolbox fa-lg"></i> &nbsp; <span> ORDEM DE SERVIÇO </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/funcionarios'>
                                <div id='funcionarios'></div> <li id='li-funcionarios'> <i className="fas fa-user-tie fa-lg"></i> &nbsp; <span> FUNCIONARIOS </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/ajuda'>
                                <div id='ajuda'></div> <li id='li-ajuda'> <i className="fas fa-question-circle fa-lg"></i> &nbsp; <span> AJUDA </span> </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </MDBAnimation>
        )
    }
}

export default menu