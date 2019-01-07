import React, {Component} from 'react'
import './container.css'

class container extends Component{

    render(){
        return(
            <div id='box'>
                <div id='container'>
                    <div id='conteudo'> 
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default container