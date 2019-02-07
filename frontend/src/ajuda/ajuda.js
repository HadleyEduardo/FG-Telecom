import React, {Component} from 'react'

class ajuda extends Component{

    componentWillMount() {
        this.props.rotaAtual('ajuda')
    }

    render(){
        return(
            <div>
                <h1>AJUDA</h1>
            </div>
        )
    }
}

export default ajuda