import React, {Component} from 'react'
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption, MDBInput} from "mdbreact";

class cadastrarItem extends Component{

    render(){
        return(
            <div>
                
                <h2 style={{textAlign: 'center'}}>cadastrar item</h2>
                <br />
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <MDBInput label="Código de Barras" autoFocus={true}/>
                        </div>
                        <div className='col-3'>
                            <br />
                            <select className="browser-default custom-select">
                                <option>selecione o modelo</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default cadastrarItem