import React from "react"
import './Header.css'
import listIcon from '../icons/listIcon.png'

class Header extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            headerEmSegundoPlano: false
        }
    }

    toggleMenu(e){
        e.preventDefault()
        this.props.toggleMenu()
    }
    
    render(){
        
        setInterval(() => {
            if(document.querySelector('.modal-backdrop')){
                if(this.state.headerEmSegundoPlano === false){
                    setTimeout(() => {
                        this.setState({headerEmSegundoPlano: true})
                    }, 300)
                    console.log('true!')
                }
            }else{
                if(this.state.headerEmSegundoPlano === true) {
                    this.setState({headerEmSegundoPlano: false})
                    console.log('false!')
                }
            }
            
        }, 0)

        var valueIndex
        if(this.state.headerEmSegundoPlano) {
            valueIndex = 0
        }else{
            valueIndex = 2
        }

        return(
            <div style={{zIndex: valueIndex}} className="Header">
                <a href='' onClick={(e) => this.toggleMenu(e)}>
                    <div id='icon-header'>
                        <img id='img-icon-header' src={listIcon} />
                    </div>
                </a>
                {this.props.loginIcon}
            </div>
        )
    }

}
export default Header  