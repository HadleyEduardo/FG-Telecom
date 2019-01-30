import React from "react"
import axios from 'axios'
import './cadastrarCliente.css'
import { MDBBtn } from "mdbreact";

class cadastrarCliente extends React.Component{
    enviar(e){
        e.preventDefault();
        const form = {
            nome: e.target.nome.value,
            cpf: e.target.cpf.value,
            rg: e.target.rg.value,
            telefone: e.target.telefone.value,
            email: e.target.email.value,
            endereco: {
                rua: e.target.rua.value,
                numero: e.target.numero.value,
                bairro: e.target.bairro.value,
                cidade: e.target.cidade.value,
                pontoReferencia: e.target.pontoReferencia.value
            }
        }

        axios.post('http://localhost:3001/clientes/novo', form)
            .then((form) => {
                console.log(form)
                window.location.href = 'http://localhost:3000/clientes'
            }, (erro) => {
                console.log(erro)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    render(){
        const size = this.props.size
        var legend = null
        if(size === 40){
            legend = (<h1>Cadastrar cliente</h1>)
        }else{
            legend = (<h3>Cadastrar cliente</h3>)
        }
        return (
            <div style={{width: '100%', height: '100%'}}>
                <form onSubmit={ this.enviar} name="form" id="form">
                    <fieldset class="scheduler-border"><legend class="scheduler-border"> {legend} </legend>
                        <fieldset id="usuario" class="scheduler-border"><legend class="scheduler-border">Identificação</legend>
                            <p>Nome <input type="text" name="nome" id="iNome" size={size} /> </p>
                            <p>CPF <input type="text" name="cpf" id="icpf" size={size}/> </p>
                            <p>RG <input type="text" name="rg" id="iRG" size={size} /></p>
                            <p>Telefone  <input type="text" name="telefone" id="iTelefone" size={size} /></p>
                            <p>E-mail <input type="email" name="email" id="iemail" size={size} /></p>
                        </fieldset>
                        <fieldset id="Endereco" class="scheduler-border"><legend class="scheduler-border">Endereco</legend>
                            <p>Bairro <input type="text" name="bairro" id="ibairro" size={size} /></p>
                            <p>Rua <input type="text" name="rua" id="irua" size={size} /></p>
                            <p>Numero <input type="number" name="numero" id="inume" size={size} /></p>
                            <p>Cidade <input type="text" name="cidade" id="icidade" size={size} /></p>
                            <p>CEP <input type="text" name="cep" id="icpf" size={size} /></p>
                            <p>Ponto de referencia <br/> <textarea name="pontoReferencia" id="ipontoReferencia" rows="10" cols={size}></textarea></p>
                        </fieldset>
                        <p> 
                            <MDBBtn  color="primary">Salvar</MDBBtn> 
                            
                        </p>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default cadastrarCliente