import React, {Component} from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';

class ModalConteudo extends React.Component {
    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-lg">
                    <MDBModalHeader className='primary-color text-white'><h1>Cliente</h1></MDBModalHeader>
                    <MDBModalBody className='barra_rolagem'>
                        {this.props.mensagem}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.props.toggle}>Sair</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}
export default ModalConteudo