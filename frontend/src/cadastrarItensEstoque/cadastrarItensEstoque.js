import React, { Component } from 'react'
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBInput, MDBBtn, MDBIcon} from "mdbreact";
import './cadastrarItensEstoque.css'

class cadastrarItensEstoque extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggleTabs: {
                1: 'nav-link active',
                2: 'nav-link',
                3: 'nav-link'  
            },
            conteudoNavTab: null
        }
    }

    componentWillMount(){
        this.navTabData(1)
    }

    toggleTabs(id) {
        if(id === 1){
            this.setState({
                toggleTabs: {
                    1: 'nav-link active',
                    2: 'nav-link',
                    3: 'nav-link'
                }
            })
        }
        if(id === 2){
            this.setState({
                toggleTabs: {
                    2: 'nav-link active',
                    1: 'nav-link',
                    3: 'nav-link'
                }
            })
        }
        if(id === 3){
            this.setState({
                toggleTabs: {
                    3: 'nav-link active',
                    2: 'nav-link',
                    1: 'nav-link'
                }
            })
        }
        this.navTabData(id)
    }

    navTabData(id) {
        if(id === 1) {
            this.setState({conteudoNavTab: this.produto()})
        }
        if(id === 2) {
            this.setState({conteudoNavTab: this.modelo()})
        }
        if(id === 3) {
            this.setState({conteudoNavTab: this.marca()})
        }
    }

    produto() {
        return(
            <div>
                <br />
                <br />
                <h5 style={{textAlign: 'center'}}>cadastrar produto</h5>
                <br />
                <br />
                <div className='container'>
                    
                    <div className='row'>
                        <div className='centralizar col-xs-2 col-sm-6'>
                            <MDBInput icon='barcode' label="Código de Barras" autoFocus={true}/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='centralizar col-xs-2 col-sm-6'>
                            <MDBInput icon='shopping-cart' label="Nome do Produto" autoFocus={true}/>
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='centralizar col-xs-2 col-sm-4'>
                            <br />
                            <select className="browser-default custom-select">
                                <option>marca & modelo</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                    </div>    
                    <br />
                    <br />
                    <div id='button-salvar'>
                        <MDBBtn color="primary">
                            <MDBIcon icon='box-open' className='mr-1' /> Salvar
                        </MDBBtn>
                    </div>
                </div>
            </div>
        )
    }

    modelo() {
        return(
            <div>
                <h1>modelo</h1>
            </div>
        )
    }

    render() {
        return (
            <div class="container">
                
                <br />
                <div class="row">
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='nav nav-tabs'>
                            <div className='nav-item'>
                                <a onClick={() => this.toggleTabs(1)} className={this.state.toggleTabs["1"]} role="tab" data-toggle="tab" href='#home'>Produto</a>
                            </div>
                            <div className='nav-item'>
                                <a onClick={() => this.toggleTabs(2)} className={this.state.toggleTabs["2"]} role="tab" data-toggle="tab" href='#profile'>Marca & Modelo</a>
                            </div>
                        </div>
                        {this.state.conteudoNavTab}
                    </div>
                </div>
            </div>
        )
    }
}

export default cadastrarItensEstoque