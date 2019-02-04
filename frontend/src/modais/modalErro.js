import React, {Component} from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';

class modalErro extends Component{

    render(){
        return(
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} size='sm' centered>
                    <MDBModalHeader className='danger-color text-white' toggle={this.toggle}> <MDBIcon icon="exclamation-circle" /> &nbsp; Alerta!</MDBModalHeader>
                    <MDBModalBody>
                        <div style={{textAlign: 'center'}}> <h5> {this.props.mensagem} </h5> </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" size='sm' onClick={this.props.toggle}>Ok, entendi!</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default modalErro