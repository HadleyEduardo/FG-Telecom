import React, {Component} from 'react'

class venda extends Component{

    componentWillMount() {
        this.props.rotaAtual('venda')
    }

    render(){
        return(
            <div>
                <h1>VENDA</h1>
            </div>
        )
    }
}

export default venda