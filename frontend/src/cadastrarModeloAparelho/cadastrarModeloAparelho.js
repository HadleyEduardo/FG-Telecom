import React, {Component} from 'react'
import { MDBInput } from "mdbreact";

class cadastrarModeloAparelho extends Component{

    render(){
        return(
            <div>
                <h2 style={{textAlign: 'center'}}>Cadastrar Modelo de Aparelho</h2>
                <MDBInput label="Nome do Modelo" autoFocus={true} style={{width: '35%'}} />
            </div>
        )
    }
}

export default cadastrarModeloAparelho