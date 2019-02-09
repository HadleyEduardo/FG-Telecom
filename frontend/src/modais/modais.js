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
        this.props.infoModal({
            ...this.props.modais,
            nome: null,
            typeModal: '',
            mensagem: '',
            btnConfirmacao: null,
        })
    }

    decidir(decisao) {
        this.props.infoModal({...this.props.modais, decisao: decisao})
    }

    render() {
        var modalUsado = null

        if(this.state.ativarModal === false){
            this.toggle()
        }

        if(this.props.modais.nome !== null){
            if(this.props.modais.nome === 'modalAviso'){
                modalUsado = (<ModalAviso decidir={(decisao) => this.decidir(decisao)} btnConfirmacao={this.props.modais.btnConfirmacao} mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} />)
            }

            if(this.props.modais.nome === 'modalErro'){
                
                modalUsado = (<ModalErro mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} />)
            }

            if(this.props.modais.nome === 'modalSucesso'){
                modalUsado = (<ModalSucesso mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} />)
            }

            if(this.props.modais.nome === 'modalConteudo'){
                console.log(this.state.ativarModal)
                modalUsado = (<ModalConteudo salvar={(event) => this.props.modais.salvar(event)} footer={this.props.modais.footer} mensagem={this.props.modais.mensagem} modal={this.state.ativarModal} toggle={this.toggle} typeModal={this.props.modais.typeModal} />)
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