import React, {Component} from 'react'
import ModalAviso from './modalAviso'
import ModalErro from './modalErro'
import ModalSucesso from './modalSucesso'
import ModalConteudo from './modalConteudo'

class modais extends Component{

    constructor(props) {
        super(props)
        this.state = {
            ativarModal: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({ativarModal: !this.state.ativarModal})
    }

    render() {
        var modalUsado = null

        if(this.state.ativarModal === false){
            this.toggle()
        }

        if(this.props.modais.nome !== null){
            if(this.props.modais.nome === 'modalAviso'){
                this.toggle()
                modalUsado = (<ModalAviso mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} />)
            }

            if(this.props.modais.nome === 'modalErro'){
                this.toggle()
                modalUsado = (<ModalErro mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} />)
            }

            if(this.props.modais.nome === 'modalSucesso'){
                this.toggle()
                modalUsado = (<ModalSucesso mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} />)
            }

            if(this.props.modais.nome === 'modalConteudo'){
                modalUsado = (<ModalConteudo mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} typeModal={this.props.modais.typeModal} />)
            }
        }

        return(
            <div>
                {modalUsado}
            </div>
        )
    }
}

export default modais