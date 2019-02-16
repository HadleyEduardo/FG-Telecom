import React, {Component} from 'react'
import './menu-lateral.css'
import { Link } from 'react-router-dom'
import { MDBAnimation } from "mdbreact";
import perfilHadlei from '../imagens/seu-Hadlei.png'

class menu extends Component{

    constructor(props) {
        super(props)
        this.state = {
            style: {
                visibility: 'visible'
            },
            loginIconMobile: null,
            rotas: ['vendas', 'estoque', 'clientes', 'ordem-de-servico', 'funcionarios', 'ajuda']
        }
    }

    componentDidMount() {
        this.toggleMenu()
        window.addEventListener('resize', () => this.desativarMenuModoMobile())
        this.desativarMenuModoMobile()

        var rota = this.definirRotaAoCarregarPagina()
        if(rota) {
            var idMenu = '#' + rota
            var idLi = '#li-' + rota
            this.ativarItemDoMenu(idMenu, idLi)
        }
    }

    toggleMenu() {
        document.getElementById('toggle-menu').addEventListener('click', (e) => {
            e.preventDefault()
            if(this.state.style.visibility === 'visible') {
                this.setState({style: {
                    visibility: 'hidden'
                }})
            }else{
                this.setState({style: {
                    visibility: 'visible'
                }})
            }
        })
    }
    
    desativarMenuModoMobile() {
        var width = window.innerWidth
        if(width < 601) {
            if(this.state.style.visibility === 'visible') {
                this.setState({style: {
                    visibility: 'hidden'
                }})
            }

            this.setState({
                loginIconMobile: (
                  <div>
                    <div id='icon-login-mobile'>
                      <div id='photo-mobile'>
                        <img id="photo-perfil-mobile" style={{ borderRadius: '100px' }} width='39px' height='39px' src={perfilHadlei} />
                      </div>
                      &nbsp;
                    <div id='caret-icon-mobile'>
                        <br />
                        <i className="fas fa-caret-down"></i>
                      </div>
                    </div>
                    <div id='div-do-nome-usuario'>
                      <p id="nome-do-usuario">Hadlei Garcia</p>
                      <p id="tipo-de-usuario">Administrador</p>
                    </div>
                    <hr />
                  </div>
                )
            })
        }else{
            if(this.state.style.visibility === 'hidden') {
                this.setState({style: {
                    visibility: 'visible'
                    },
                    loginIconMobile: null
                })
            }
        }
    }

    ativarItemDoMenu(idMenu, id_li){
        if(document.querySelector('div.ativo') && document.querySelector('li.liAtivo')) {
            document.querySelector('div.ativo').className = ''
            document.querySelector('li.liAtivo').className = ''
        }
        document.querySelector(idMenu).className = 'ativo'
        document.querySelector(id_li).className = 'liAtivo'
    }

    definirRotaAoCarregarPagina() {
        const rotaAtual = window.location.href
        var rotas = this.state.rotas
        var rotaSelecionada = '' 
        for(var i in rotas) {
            var rota = rotas[i]
            rota = rota.substring(0, 5)
            if(rotaAtual.indexOf(rota) !== -1) {
                rotaSelecionada = rotas[i]
            }
        }

        if(rotaSelecionada === '') {
            return 'agenda'
        }

        return rotaSelecionada
    }

    render(){
        
        var animation
        if(this.state.style.visibility === 'hidden'){
            animation = 'zoomOutLeft' 
        }else{
            animation = 'zoomOutRigth'
        }

        return(
            <MDBAnimation type={animation} duration="1000ms" delay='1s'>
                <div style={this.state.style} id='menu-lateral'>
                    {this.state.loginIconMobile}
                    <br />
                    <nav>
                        <ul>
                            <Link className='text-decoration-none' to='/' onClick={() => this.ativarItemDoMenu('#agenda', '#li-agenda')}>
                                <div id='agenda'></div> <li id='li-agenda'> <i className="far fa-calendar-alt fa-lg"></i> &nbsp; <span> AGENDA </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/vendas' onClick={() => this.ativarItemDoMenu('#vendas', '#li-vendas')}>
                                <div id='vendas'></div> <li id='li-vendas'> <i className="fas fa-shopping-cart fa-lg"></i> &nbsp; <span> VENDAS </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/estoque' onClick={() => this.ativarItemDoMenu('#estoque', '#li-estoque')}> 
                                <div id='estoque'></div><li id='li-estoque'> <i className="fas fa-box-open fa-lg"></i> &nbsp; <span> ESTOQUE </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/clientes' onClick={() => this.ativarItemDoMenu('#clientes', '#li-clientes')}>
                                <div id='clientes'></div> <li id='li-clientes'> <i className="fas fa-users fa-lg"></i> &nbsp; <span> CLIENTES </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/ordem-de-servico' onClick={() => this.ativarItemDoMenu('#ordem-de-servico', '#li-ordem-de-servico')}>
                                <div id='ordem-de-servico'></div> <li id='li-ordem-de-servico'> <i className="fas fa-toolbox fa-lg"></i> &nbsp; <span> ORDEM DE SERVIÇO </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/funcionarios' onClick={() => this.ativarItemDoMenu('#funcionarios', '#li-funcionarios')}>
                                <div id='funcionarios'></div> <li id='li-funcionarios'> <i className="fas fa-user-tie fa-lg"></i> &nbsp; <span> FUNCIONARIOS </span> </li>
                            </Link>
                            <Link className='text-decoration-none' to='/ajuda' onClick={() => this.ativarItemDoMenu('#ajuda', '#li-ajuda')}>
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