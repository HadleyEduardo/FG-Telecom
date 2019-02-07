import React, {Component} from 'react'

class funcionarios extends Component{

    componentWillMount() {
        this.props.rotaAtual('funcionarios')
    }

    render(){
        return(
            <div>
                <h1>FUNCIONARIOS</h1>
            </div>
        )
    }
}

export default funcionarios