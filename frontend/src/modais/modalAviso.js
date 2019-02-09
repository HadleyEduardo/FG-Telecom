import React, {Component} from 'react'
import { MDBContainer, MDBModal, Button, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBtn } from 'mdbreact';

class modalAviso extends Component{

    render() {
        var btn = null
        if(this.props.btnConfirmacao){
            btn = (
                <div>
                    <MDBBtn color="primary" size='sm' onClick={() => this.props.decidir(true)}>Sim</MDBBtn>
                    <MDBBtn color="defaulted black-text" size="sm" onClick={() => this.props.decidir(false)}>Não</MDBBtn>
                </div>
            )
        }else{
            btn = (
                <MDBBtn color="warning" size='sm' onClick={this.props.toggle}>Ok, entendi!</MDBBtn>
            )
        }
        
        return(
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} centered size='sm'>
                    <MDBModalHeader style={{ backgroundColor: '#FFBB33', color: 'white', fontWeight: 'bold' }}> <MDBIcon icon="exclamation-triangle" /> Alerta </MDBModalHeader>
                    <MDBModalBody>
                        {this.props.mensagem}
                    </MDBModalBody>
                    <MDBModalFooter>
                        {btn}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default modalAviso