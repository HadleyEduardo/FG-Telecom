import React from 'react';
import { MDBInput } from "mdbreact";

export default class cadastrarEstoque extends React.Component{
    render(){
        return(
            <MDBInput label="Material input" autoFocus={true}/>
        );
    }
}