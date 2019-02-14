import React from "react"
import axios from 'axios'
import './cadastrarCliente.css'
import { MDBBtn } from "mdbreact";
import modal from '../modais/manipulandoModal'

class cadastrarCliente extends React.Component {

    constructor(props) {
        super(props)
        this.enviar = this.enviar.bind(this)
    }

    componentWillMount() {
        this.props.rotaAtual('clientes')
        window.addEventListener('resize', () => this.sizeScreen())
    }

    componentDidMount() {
        this.sizeScreen()
    }

    enviar(e) {
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
                cep: e.target.cep.value,
                pontoReferencia: e.target.pontoReferencia.value
            }
        }

        try{
            axios.post('http://localhost:3001/clientes/novo', form)
                .then((form) => {
                    if(form.data.erro) {
                        var mensagem = form.data.mensagem
                        modal('erro', mensagem)
                    }else{
                        var mensagem = form.data.mensagem
                        modal('sucesso', mensagem)
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/clientes'
                        }, 1000)
                    }
                }, (erro) => {
                    var mensagem = 'A conexão com a internet pode estar interrompida ou o servidor está com problemas'
                    modal('aviso', mensagem)
                })
                .catch((e) => {
                    var mensagem = 'Ocorreu um problema grave ao tentar salvar o novo cliente!\nChame o suporte!'
                    modal('aviso', mensagem)
                })

        }catch(e) {
            console.log(e)
        }
    }

    sizeScreen() {
        var width = window.innerWidth
        if(width < 480) {
            var inputs = document.querySelectorAll('input')
            console.log(inputs)
            for(var i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute('size', '27')
            }
            document.querySelector('h1').style.fontSize = '100%'
        }else{
            if(width < 546) {
                var inputs = document.querySelectorAll('input')
                for(var i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute('size', '27')
                }
                document.querySelector('h1').style.fontSize = '99%'
            }else{
                if(width < 350) {
                    var inputs = document.querySelectorAll('input')
                    for(var i = 0; i < inputs.length; i++) {
                        inputs[i].setAttribute('size', '25')
                    }
                    document.querySelector('h1').style.fontSize = '100%'
                }else{
                    document.querySelector('h1').style = ''
                    var inputs = document.querySelectorAll('input')
                    for(var i = 0; i < inputs.length; i++) {
                        inputs[i].setAttribute('size', '40')
                    }
                }
            }
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <form onSubmit={this.enviar} name="form" id="form">
                    <fieldset className="scheduler-border"><legend className="scheduler-border"> <h1>Cadastrar Cliente</h1> </legend>
                        <fieldset id="usuario" className="scheduler-border"> <legend className="scheduler-border">Identificação</legend>
                            <p>Nome <input type="text" name="nome" id="iNome" /> </p>
                            <p>CPF <input type="text" name="cpf" id="icpf" /> </p>
                            <p>RG <input type="text" name="rg" id="iRG" /></p>
                            <p>Telefone  <input type="text" name="telefone" id="iTelefone" /></p>
                            <p>E-mail <input type="email" name="email" id="iemail" /></p>
                        </fieldset>
                        <fieldset id="Endereco" className="scheduler-border"><legend className="scheduler-border">Endereco</legend>
                            <p>Bairro <input type="text" name="bairro" id="ibairro" /></p>
                            <p>Rua <input type="text" name="rua" id="irua" /></p>
                            <p>Numero <input type="number" name="numero" id="inume" /></p>
                            <p>Cidade <input type="text" name="cidade" id="icidade" /></p>
                            <p>CEP <input type="text" name="cep" id="icpf" placeholder="Digite o CEP aqui"/></p>
                            <p>Ponto de referencia <br /> <textarea name="pontoReferencia" id="ipontoReferencia" rows="10" ></textarea></p>
                        </fieldset>
                        <p>
                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                        </p>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default cadastrarCliente