import React, {Component} from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';

class ModalConteudo extends Component {
    
    render() {
        var color = null
        var text = null
        if(this.props.typeModal === 'editar'){
            color = 'warning'
            text = 'warning'
        }else{
            color = 'primary'
            text = 'white'
        }

        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-lg">
                    <MDBModalHeader className={color + '-color text-' + text}><h1>Cliente</h1></MDBModalHeader>
                    <MDBModalBody className='barra_rolagem'>
                        {this.props.mensagem}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color={color} onClick={this.props.toggle}>Sair</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}
export default ModalConteudo