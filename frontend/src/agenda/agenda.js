import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class agenda extends Component {
   
    componentWillMount() {
        this.props.rotaAtual('agenda')
    }

    render() {
        return (
            <div>
                <h2>Agenda</h2>
            </div>
        )
    }
}

export default agenda