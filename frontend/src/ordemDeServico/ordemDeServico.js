import React, {Component} from 'react'

class ordemDeServico extends Component{

    componentWillMount() {
        this.props.rotaAtual('ordemDeServico')
    }

    render(){
        return(
            <div>
                <h1>ORDEM DE SERVICO</h1>
            </div>
        )
    }
}

export default ordemDeServico