import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './clientes.css'; 

class clientes extends Component{

    render(){
        return(
            <div>
                
                <div className="container">
            <div id="top" class="row">
    <div class="col-md-3">
        <h2>Clientes</h2>
    </div>
 
    <div class="col-md-6">
        <div class="input-group h2">
            <input name="data[search]" class="form-control" id="search" type="text" placeholder="Pesquisar Itens"></input>
            <span class="input-group-btn">
                <button class="btn btn-primary" type="submit">
                Pesquisar
                </button>
            </span>
        </div>
    </div>
 
    <div class="col-md-3">
            <Link to='/clientes/novo'>
            <a href="add.html" class="btn btn-primary pull-right h2">Novo Cliente</a>
            </Link>
        
    </div>
    <div id="list" class="row">
 
    <div class="table-responsive col-md-12">
        <table class="table table-striped" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>CADASTRADO</th>
                    <th class="actions">Ações</th>
                 </tr>
            </thead>
            <tbody>
 
                <tr>
                    <td>01</td>
                    <td>Hadley Eduardo Louveira Garcia</td>
                    <td>009.052.711-90</td>
                    <td>01/01/2015</td>
                    <td class="actions">
                        <a class="btn btn-success btn-xs" href="view.html">Visualizar</a>
                        <a class="btn btn-warning btn-xs" href="edit.html">Editar</a>
                        <a class="btn btn-danger btn-xs"  href="#" data-toggle="modal" data-target="#delete-modal">Excluir</a>
                    </td>
                </tr>
 
            </tbody>
         </table>
 
     </div>
     <div id="bottom" class="row">
    <div class="col-md-12">
         
    <nav aria-label="Page navigation example">
  <ul class="pagination pg-blue justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" tabindex="-1">Previous</a>
    </li>
    <li class="page-item"><a class="page-link">1</a></li>
    <li class="page-item"><a class="page-link">2</a></li>
    <li class="page-item"><a class="page-link">3</a></li>
    <li class="page-item">
      <a class="page-link">Next</a>
    </li>
  </ul>
</nav>
    </div>
</div> 
 </div> 
 
   </div> 
            </div>
            </div>
        )
    }
}

export default clientes