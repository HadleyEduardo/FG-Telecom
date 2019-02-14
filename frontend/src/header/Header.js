import React from "react"
import './Header.css'
import listIcon from '../icons/listIcon.png'
import perfilHadlei from '../imagens/seu-Hadlei.png'

class Header extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            loginIconLarge: null,
            styleDropdown: {
                visibility: 'hidden'
            },
        }
    }

    dropdownToggle(e) {
        e.preventDefault()
        if (this.state.styleDropdown.visibility === 'hidden') {
          this.setState({
            styleDropdown: {
              visibility: 'visible'
            }
          }, () => {
            this.widthScreenMobileDevice()
          }, false)
        } else {
          this.setState({
            styleDropdown: {
              visibility: 'hidden'
            }
          }, () => {
            this.widthScreenMobileDevice()
          })
        }
      }

    componentWillMount() {
        window.addEventListener('resize', () => this.widthScreenMobileDevice())
        this.widthScreenMobileDevice()
    }
    
    widthScreenMobileDevice() {
        var width = window.innerWidth;
        if (width < 601) {
          this.setState({
            loginIconLarge: null
          })

        } else {
    
          this.setState({
            loginIconLarge: (
              <div>
                <a href='' onClick={(e) => this.dropdownToggle(e)}>
                  <div id='icon-login'>
                    <div id='photo'>
                      <img id="photo-perfil" style={{ borderRadius: '100px' }} src={perfilHadlei} />
                    </div>
                    &nbsp;
                  <div id='caret-icon'>
                      <br />
                      <i className="fas fa-caret-down"></i>
                    </div>
                  </div>
                </a>
                <div style={this.state.styleDropdown} id='dropdown'>
                  <i className="fas fa-sign-out-alt"></i> <b> Sair </b>
                </div>
              </div>
            )
          })
        }
    
      }

    render(){

        return(
            <div style={{zIndex: 1}} className="Header">
                <a href='' id='toggle-menu'>
                    <div id='icon-header'>
                        <img id='img-icon-header' src={listIcon} />
                    </div>
                </a>
                {this.state.loginIconLarge}
            </div>
        )
    }

}
export default Header  