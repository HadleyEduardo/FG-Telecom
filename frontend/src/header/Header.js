import React from "react"
import './Header.css'
import listIcon from '../icons/listIcon.png'
import perfilHadlei from '../imagens/seu-Hadlei.png'

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
                        <img width='32px' src={listIcon} />
                    </div>
                </a>
                <div id='icon-login'>
                    <div id='photo'>
                        <img style={{borderRadius: '100px'}} width='39px' height='39px' src={perfilHadlei} />
                    </div>
                    &nbsp;
                    <div id='caret-icon'>
                        <br />
                        <i className="fas fa-caret-down"></i>
                    </div>
                </div>
            </div>
        )
    }

}
export default Header  