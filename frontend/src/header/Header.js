import React from "react"
import './Header.css'
import listIcon from '../icons/listIcon.png'
import perfilHadlei from '../imagens/seu-Hadlei.png'

class Header extends React.Component{

    render(){
        return(
            <div className = "Header">
                <div id='icon-header' onClick={() => {alert('clicou!')}}>
                    <img width='32px' src={listIcon} />
                </div>
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