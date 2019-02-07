import React from "react"
import './Header.css'
import listIcon from '../icons/listIcon.png'

class Header extends React.Component{

    toggleMenu(e){
        e.preventDefault()
        this.props.toggleMenu()
    }
    
    render(){
        var valueIndex
        if(this.props.headerEmSegundoPlano) {
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