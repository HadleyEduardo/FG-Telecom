import React, { Component } from 'react';

var lista = [
    {
        cpf: "077.456.841-02",
        nome: "Matheus Daniel",
        idade: "17",
        endereco: "R. Quintino Bocaiuva"
    },
    {
        cpf: "123.456.789-01",
        nome: "Rafael de Azevedo Castro",
        idade: "17",
        endereco: "Casa do Caralho"
    },
    {
        cpf: "234.567.890-12",
        nome: "Rodrigo Bispo Echeverria",
        idade: "16",
        endereco: "Presídio Nossa Senhora das Dores"
    },
    {
        cpf: "345.678.901-23",
        nome: "Mariana Ayala",
        idade: "16",
        endereco: "Meu Coração"
    }
];

export default class apagarDepois extends Component {

    preencheTabela() {
        return lista.map((ele) => {
            return(
                <tr>
                    <td>{ele.cpf}</td>
                    <td>{ele.nome}</td>
                    <td>{ele.idade}</td>
                    <td>{ele.endereco}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Prazos te deixam sobre muita pressão</h1>

                <p>Um programador poderia desmaiar sobre tanta pressão! Por favor, acabe com os prazos! Abaixo assinado na Central de Relacionamento (CEREL) do Instituto Federal de Educação, Ciência e Tecnologia de Mato Grosso do Sul!</p>

                <cite>-- Rafael de Azevedo Castro</cite>

                <table border="1px">
                    <thead>
                        {/* colunas */}
                        <th>CPF</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Endereço</th>
                    </thead>
                    <tbody>
                        {this.preencheTabela()}
                    </tbody>
                </table>
            </div>
        );
    }
}