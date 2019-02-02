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
            <MDBContainer>
                <MDBBtn color="primary" onClick={this.toggle(14)}>Visualizar</MDBBtn>
                <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                    <MDBModalBody>
                    <fieldset class="scheduler-border"><legend class="scheduler-border"><h1>Cliente</h1></legend>
                        <fieldset id="usuario" class="scheduler-border"><legend class="scheduler-border">Informações</legend>
                            <p>Nome <input type="text" name="nome" id="iNome" value="Hadley"/> </p>
                            <p>CPF <input type="text" name="cpf" id="icpf" value="00905271190"/> </p>
                            <p>RG <input type="text" name="rg" id="iRG" value="363456"/></p>
                            <p>Telefone  <input type="text" name="telefone" id="iTelefone" value="996633296"  /></p>
                            <p>E-mail <input type="email" name="email" id="iemail" value="hadleyeduardogarcia@gmail.com" /></p>
                        </fieldset>
                        <fieldset id="Endereco" class="scheduler-border"><legend class="scheduler-border">Endereco</legend>
                            <p>Bairro <input type="text" name="bairro" id="ibairro" value="Centro"/></p>
                            <p>Rua <input type="text" name="rua" id="irua"  value="Carlos Luz Ardo"/></p>
                            <p>Numero <input type="number" name="numero" id="inume"  value="806"/></p>
                            <p>Cidade <input type="text" name="cidade" id="icidade"  value="Anastacio"/></p>
                            <p>CEP <input type="text" name="cep" id="icpf"  value="79210000"/></p>
                            <p>Ponto de referencia <br /> <textarea name="pontoReferencia" id="ipontoReferencia" rows="10" value="È em algum lugar" ></textarea></p>
                        </fieldset>
                    </fieldset>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(14)}>Sair</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            </div>
        )
    }
}

export default agenda