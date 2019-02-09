import React from "react"
import axios from 'axios'
import './cadastrarCliente.css'
import { MDBBtn } from "mdbreact";

class cadastrarCliente extends React.Component {

    constructor(props) {
        super(props)
        this.enviar = this.enviar.bind(this)
        this.toggleModalErro = this.toggleModalErro.bind(this)
    }

    componentWillMount() {
        this.props.rotaAtual('clientes')
    }

    componentDidMount() {

        //carrega os dados no formulário novamente caso a operação de salvar não de certo!
        if(this.props.modais.dadosForm) {
            console.log('dados')
            console.log(this.props.modais.dadosForm)
            var dadosForm = this.props.modais.dadosForm
            for(var i in dadosForm) {
                if(i !== 'endereco') {
                    var input  = document.getElementsByName(i)[0]
                    input.setAttribute('value', dadosForm[i])
                }else{
                    var endereco = dadosForm[i]
                    for(var key in endereco) {
                        if(key === 'pontoReferencia') {
                            document.getElementsByName(key)[0].value = endereco[key]
                            console.log(document.getElementsByName(key))
                        }
                        var input = document.getElementsByName(key)[0]
                        input.setAttribute('value', endereco[key])
                    }
                }
            }
        }
    }

    toggleModalErro() {
        this.setState({modalErro: false})
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
                        var infoModal = {...this.props.modais, nome: 'modalErro', mensagem: form.data.mensagem, dadosForm: form.data.dadosForm}
                        this.props.infoModal(infoModal)    
                    }else{
                        var infoModal =  {...this.props.modais, nome: 'modalSucesso', mensagem: form.data.mensagem}
                        this.props.infoModal(infoModal)
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/clientes'
                        }, 500)
                    }
                }, (erro) => {
                    var infoModal = {...this.props.modais, nome: 'modalAviso', mensagem: 'A conexão com a internet pode estar interrompida oo o servidor está com problemas'}
                    this.props.infoModal(infoModal)
                })
                .catch((e) => {
                    var infoModal = {...this.props.modais, nome: 'modalAviso', mensagem: 'Ocorreu um problema grave ao tentar salvar o novo cliente!\nChame o suporte!'}
                    this.props.infoModal(infoModal)
                })

        }catch(e) {
            console.log(e)
        }
    }

    render() {
        const size = this.props.size
        var legend = null
        if (size === 40) {
            legend = (<h1>Cadastrar cliente</h1>)
        } else {
            legend = (<h3>Cadastrar cliente</h3>)
        }
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <form onSubmit={this.enviar} name="form" id="form">
                    <fieldset className="scheduler-border"><legend className="scheduler-border"> {legend} </legend>
                        <fieldset id="usuario" className="scheduler-border"><legend className="scheduler-border">Identificação</legend>
                            <p>Nome <input type="text" name="nome" id="iNome" size={size} /> </p>
                            <p>CPF <input type="text" name="cpf" id="icpf" size={size} /> </p>
                            <p>RG <input type="text" name="rg" id="iRG" size={size} /></p>
                            <p>Telefone  <input type="text" name="telefone" id="iTelefone" size={size} /></p>
                            <p>E-mail <input type="email" name="email" id="iemail" size={size} /></p>
                        </fieldset>
                        <fieldset id="Endereco" className="scheduler-border"><legend className="scheduler-border">Endereco</legend>
                            <p>Bairro <input type="text" name="bairro" id="ibairro" size={size} /></p>
                            <p>Rua <input type="text" name="rua" id="irua" size={size} /></p>
                            <p>Numero <input type="number" name="numero" id="inume" size={size} /></p>
                            <p>Cidade <input type="text" name="cidade" id="icidade" size={size} /></p>
                            <p>CEP <input type="text" name="cep" id="icpf" size={size} placeholder="Digite o CEP aqui"/></p>
                            <p>Ponto de referencia <br /> <textarea name="pontoReferencia" id="ipontoReferencia" rows="10" cols={size}></textarea></p>
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