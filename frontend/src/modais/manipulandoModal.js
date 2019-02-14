var ativarModal = () => {
    document.querySelector('div#modalApp').style.display = 'block'
    document.querySelector('div.modal-backdrop').style.visibility = 'visible'
}

var desativarModal = () => {
    if(document.querySelector('div#modalApp') && document.querySelector('div.modal-backdrop')) {
        document.querySelector('div#modalApp').style = ''
        document.querySelector('div.modal-backdrop').style.visibility = 'hidden'
    }
}

const modal = (nome = null, conteudo = null, functions = null, type = null) => {
    var modal = 'modalApp'
    var header = 'modal-header'
    var body = 'modal-body'
    var footer = 'modal-footer'
    var btn = {
        btnClose: 'modal-btn-close',
        btnSalvar: 'modal-btn-salvar'
    }
    var modalInicializacao = desativandoModalIcializacao(nome, conteudo, functions, type)
    if(!modalInicializacao){
        setTimeout(() => {
            ativarModal()
            document.getElementById(body).style.padding = '10px'
        }, 300)
    }
    definirType(nome, type, conteudo, functions, modal, header, body, footer, btn)
}

var definirType = (nome, type, conteudo, functions, modal, header, body, footer, btn) => {
    if(nome === 'conteudo') {
        document.getElementById(body).className = 'barra_rolagem'
        document.querySelector('div#modalApp > div.modal-dialog').className = 'modal-dialog modal-lg modal-dialog-centered'
        
        if(type === 'visualizar') {
            document.getElementById(footer).innerHTML = `<button type='button' id='close'>Fechar</button>`
            document.getElementById('close').className = 'btn btn-primary waves-effect waves-light'
            document.getElementById(header).className = 'modal-header primary-color text-white'
            document.getElementById(header).innerHTML = '<h4 class="modal-title"> <b> Visualizar Cliente </b> </h4>'
            document.getElementById(body).innerHTML = conteudo

            //adicionando evento onclick em button fechar
            document.getElementById('close').addEventListener('click', () => {
                desativarModal()
            })
        }

        if(type === 'editar') {
            //adcionando buttons ao modal
            document.getElementById(footer).innerHTML = `<button type="submit" id="editar">Editar</Button> <button type="button" style='color: black;' id='close'>Cancelar</button>`
            document.getElementById('editar').className = 'btn btn-warning waves-effect waves-light'
            document.getElementById('close').className = 'btn btn-defaulted waves-effect waves-light'

            //adicionando classes ao header do modal 
            document.getElementById(header).className = 'modal-header warning-color text-warning'

            //adicionando conteudo ao modal
            document.getElementById(body).innerHTML = conteudo

            //adicionando funcoes aos botoes
            console.log(document.getElementById('form'))
            document.getElementById('form').addEventListener('submit', (event) => {
                event.preventDefault()
                desativarModal()
                functions(event)
            })

            document.getElementById('close').addEventListener('click', () => {
                desativarModal()
            })
        }
    }

    if(nome === 'aviso') {

        document.getElementById(header).innerHTML = `<div style='font-size: 27px' class='modal-title'> <i class="fas fa-exclamation-triangle"></i> Alerta </div>`

        document.querySelector('div#modalApp > div.modal-dialog').className = 'modal-dialog modal-sm modal-side modal-bottom-right'
        document.getElementById(footer).innerHTML = `<button type='button' id='close'>Ok, entendi!</button>`
        document.getElementById('close').className = 'btn btn-warning btn-sm waves-effect waves-light'
        document.getElementById(header).className = 'modal-header warning-color text-white'
        document.getElementById(body).innerHTML = conteudo 
        
        document.getElementById('close').addEventListener('click', () => {
            desativarModal()
        })
    }

    if(nome === 'confirmacao') {

        document.getElementById(header).innerHTML = `<div style='font-size: 27px' class='modal-title'> <i class="fas fa-exclamation-triangle"></i> Alerta </div>`

        document.querySelector('div#modalApp > div.modal-dialog').className = 'modal-dialog modal-sm modal-dialog-centered'

        // adcionando buttons ao foooter do modal
        document.getElementById(footer).innerHTML = `
            <button type='button' id="confirmar">Sim</button> 
            <button type='button' id='close' style='color: black;'>Não</button>
        `

        //adicionando classes de estilo do bootstrap nos botoes do modal
        document.getElementById('close').className = 'btn btn-defaulted btn-sm waves-effect waves-light'
        document.getElementById('confirmar').className = 'btn btn-primary btn-sm waves-effect waves-light'

        //adcionando classes de estilo ao header do modal
        document.getElementById(header).className = 'modal-header warning-color text-white'
        
        //adicionando conteudo ao modal
        document.getElementById(body).innerHTML = conteudo 
        
        //adicionando eventos onClick aos botoes
        document.getElementById('confirmar').addEventListener('click', () => {
            desativarModal()
            functions()
        })

        document.getElementById('close').addEventListener('click', () => {
            desativarModal()
        })
    }

    if(nome === 'erro') {

        document.getElementById(header).innerHTML = `<div style='font-size: 27px' class='modal-title'> <i class="fas fa-exclamation-circle"></i> Erro </div>`

        document.querySelector('div#modalApp > div.modal-dialog').className = 'modal-dialog modal-sm modal-dialog-centered'
        document.getElementById(footer).innerHTML = `<button type='button' id='close'>Ok, entendi!</button>`
        document.getElementById('close').className = 'btn btn-danger btn-sm waves-effect waves-light'
        document.getElementById(header).className = 'modal-header danger-color text-white'
        document.getElementById(body).innerHTML = conteudo 
        
        document.getElementById('close').addEventListener('click', () => {
            desativarModal()
        })
    }

    if(nome === 'sucesso') {

        document.getElementById(header).innerHTML = `<div style='font-size: 27px' class='modal-title'> <i class="fas fa-check"></i> Sucesso </div>`

        document.querySelector('div#modalApp > div.modal-dialog').className = 'modal-dialog modal-sm modal-dialog-centered'
        document.getElementById(footer).className = ''
        document.getElementById(footer).innerHTML = ''
        document.getElementById(header).className = 'modal-header success-color text-white'
        document.getElementById(body).innerHTML = `<h5>${conteudo}</h5>` 
    }
}

var desativandoModalIcializacao = (nome, conteudo, functions, type) => {
    if(nome == null && conteudo == null && functions == null && type == null) {
        desativarModal()
        return true
    }
    return false
}

export default modal