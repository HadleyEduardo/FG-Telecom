import React, {Component} from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';

class modalSucesso extends Component{

    render() {
        return(
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.toggle} size='sm' centered>
                    <MDBModalHeader className='success-color text-white' toggle={this.toggle}> <MDBIcon icon="check" /> &nbsp; Alerta!</MDBModalHeader>
                    <MDBModalBody>
                        <div style={{textAlign: 'center'}}> <h5> Salvo com sucesso!</h5> </div>
                    </MDBModalBody>
                    
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default modalSucesso