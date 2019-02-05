import React, {Component} from 'react'
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBtn } from 'mdbreact';

class modalAviso extends Component{

    render() {
        return(
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} side position="bottom-rigth" size='sm'>
                    <MDBModalHeader style={{ backgroundColor: '#FFBB33', color: 'white', fontWeight: 'bold' }}> <MDBIcon icon="exclamation-triangle" /> Alerta </MDBModalHeader>
                    <MDBModalBody>
                        {this.props.mensagem}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="warning" size='sm' onClick={this.props.toggle}>Ok, entendi!</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default modalAviso