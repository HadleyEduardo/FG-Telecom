import React, {Component} from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';

class ModalConteudo extends Component {
    
    render() {
        var color = null
        var text = null
        var ModalFooter = null
        if(this.props.typeModal === 'editar'){
            color = 'warning'
            text = 'warning'
            ModalFooter = (
                <MDBModalFooter>
                    <MDBBtn color='warning' type='submit'>editar</MDBBtn>
                    <MDBBtn color='defaulted' className='black-text' onClick={this.props.toggle}>Cancelar</MDBBtn>
                </MDBModalFooter>
            )
        }else{
            color = 'primary'
            text = 'white'
            ModalFooter = (
                <MDBModalFooter>
                    <MDBBtn color={color} onClick={this.props.toggle}>Sair</MDBBtn>
                </MDBModalFooter>
            )
        }

        return (
            <MDBContainer>
                <MDBModal onSubmit={(event) => this.props.salvar(event)} isOpen={this.props.modal} toggle={this.props.toggle} className="modal-lg">
                    <MDBModalHeader className={color + '-color text-' + text}><h1>Cliente</h1></MDBModalHeader>
                    <form onSubmit={(event) => this.props.salvar(event)}>
                        <MDBModalBody className='barra_rolagem'>
                            {this.props.mensagem}
                        </MDBModalBody>
                        {ModalFooter}
                    </form>       
                </MDBModal>
            </MDBContainer>
        )
    }
}
export default ModalConteudo