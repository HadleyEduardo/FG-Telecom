import React from "react"
import './Header.css'
import listIcon from '../icons/listIcon.png'

class Header extends React.Component{

    toggleMenu(e){
        e.preventDefault()
        this.props.toggleMenu()
    }

    render(){
        return(
            <div className = "Header">
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