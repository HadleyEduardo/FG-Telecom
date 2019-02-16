import React, {Component} from 'react'
import './container.css'

class container extends Component{

    constructor(props) {
        super(props)
        this.state = {
            estadosDoContainer: {
                idBoxContainer: 'box-estado-normal',
                idContainer: 'container-estado-normal'
            }
        }
    }

    componentDidMount() {
        document.getElementById('toggle-menu').addEventListener('click', (e) => this.mudarEstadoDoContainer(e))
        window.addEventListener('resize', () => this.mudarEstadoDoContainer())
    }

    mudarEstadoDoContainer(e = null) {
        if(e){
            e.preventDefault()
        }

        var styleOfMenu = document.getElementById('menu-lateral').style.visibility
        console.log(styleOfMenu)
        if(styleOfMenu === 'hidden') {
            this.setState({
                estadosDoContainer: {
                    idBoxContainer: 'box-estado-large',
                    idContainer: 'container-estado-large'
                }
            })
        }
        if(styleOfMenu === 'visible'){
            this.setState({
                estadosDoContainer: {
                    idBoxContainer: 'box-estado-normal',
                    idContainer: 'container-estado-normal'
                }
            })
        }
    }

    sizeScreen() {
        var width = window.innerWidth
        if(width < 601) {
            if(this.state.estadosDoContainer.idBoxContainer === 'box-estado-normal') {
                this.setState({
                    estadosDoContainer: {
                        idBoxContainer: 'box-estado-large',
                        idContainer: 'container-estado-large'
                    } 
                })
            }
        }
    }

    render(){
        return(
            <div id={this.state.estadosDoContainer.idBoxContainer}>
                <div id={this.state.estadosDoContainer.idContainer}>
                    <div id='conteudo'> 
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default container