import React from "react"
import axios from 'axios'

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

        console.log(e.target.teste)
    }
    render(){
        
        return (
            <div name='teste' id='teste'>
            <form onSubmit={ this.enviar} name="form" id="form">
               <fieldset><legend><h1>Cadastro do cliente</h1></legend>
                <fieldset id="usuario" ><legend>Idenficação</legend>
                    <p>Nome <input type="text" name="nome" id="iNome" size="40" /> </p>
                    <p>CPF <input type="text" name="cpf" id="icpf" size="40"/> </p>
                    <p>RG <input type="text" name="rg" id="iRG" size="40" /></p>
                    <p>Telefone  <input type="text" name="telefone" id="iTelefone" size="40" /></p>
                    <p>E-mail <input type="email" name="email" id="iemail" size="40" /></p>
                </fieldset>
                <fieldset id="Endereco"><legend>Endereco</legend>
                    <p>Bairro <input type="text" name="bairro" id="ibairro" size="40" /></p>
                    <p>Rua <input type="text" name="rua" id="irua" size="40" /></p>
                    <p>Numero <input type="number" name="numero" id="inume" size="40" /></p>
                    <p>Cidade <input type="text" name="cidade" id="icidade" size="40" /></p>
                    <p>CEP <input type="text" name="cep" id="icpf" size="40" /></p>
                    <p>Ponto de referencia <br/> <textarea name="pontoReferencia" id="ipontoReferencia"rows="10" cols="40"></textarea></p>
                </fieldset>
              <p> <button type="submit" id="isalvar" value="Salvar">Salvar</button> 
              <button type="reset" value="Limpar" id="ilimpar" value="Limpar">Limpar</button> </p>
                </fieldset>
            </form>
            </div>
        )
    }
}

export default cadastrarCliente