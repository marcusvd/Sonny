import { Injectable } from "@angular/core";

  interface FoodNode {
    name: string;
    children?: FoodNode[];
  }
  @Injectable({ providedIn: 'root' })
  export class DatabaseService {

 //   rootLevelNodes: string[] = ['Clientes', 'Bancada', 'Financeiro', 'Parceiros', 'Estoque'];
//  Cadastrar um novo Parceiro
//  Registrar reparo eletônico terceirizado
//  Registrar uma corrida
     public TREE_DATA: FoodNode[] = [
      {
        name: 'Clientes',
        children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
      },
      {
        name: 'Bancada',
        children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
      },
      {
        name: 'Financeiro',
        children: [
          {name: 'Pagamentos',children:[{name: 'Despesas Essenciais'},{name:'Não prevista'}]},
          {name: 'Cadastros',children:[{name: 'Contas e Cartões'},  {name: 'Despesas Fixas'}]}
      ]
      },
      {
        name: 'Parceiros',
        children: [
          {name: 'Cadastros',children:[{name: 'Parceiro'}]},
          {name: 'Serviços Prestados',children:[{name: 'Reparo Eletônico'},{name: 'Coleta Entrega'}]}
        ],
      },
      {
        name: 'Estoque',
        children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
      },
      {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
          },
          {
            name: 'Orange',
            children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
          },
        ],
      },
    ];

  }
