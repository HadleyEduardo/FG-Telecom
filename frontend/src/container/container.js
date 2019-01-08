import React, {Component} from 'react'
import './container.css'

class container extends Component{

    render(){
        return(
            <div id={this.props.id.idBoxContainer}>
                <div id={this.props.id.idContainer}>
                    <div id='conteudo'> 
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default container