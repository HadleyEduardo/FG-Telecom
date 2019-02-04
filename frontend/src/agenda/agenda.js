import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class agenda extends Component {
    constructor(){
        super();
        this.state={
            test:"otario",
        }

    }
    state = {
        modal14: false
      }
      
      toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
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