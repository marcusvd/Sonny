import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';


//tree
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface TreeMenu {
  name: string;
  route: string;
  children?: TreeMenu[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  route: string;
  level: number;
}



@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {


  constructor(
    private _Router: Router,
  ) {
    this.dataSource.data = this.tree_data;
  }
  ngOnInit(): void {

  }



  private _transformer = (node: TreeMenu, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      route: node.route,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  nav(route: string) {
    console.log(route)
    this._Router.navigate([route])
  }

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;
  tree_data: TreeMenu[] = [
    // /financial/dailyinflow
    {
      name: 'Clientes', route: 'clientlist', children: [
        { name: 'Cadastros', route: 'clientmain' }, {
          name: 'Suporte', route: 'Suporte', children: [
            { name: 'Lista', route: 'Suporte' }
          ]
        },
      ]
    },
    {
      name: 'Bancada', route: 'Estoque', children: [
        { name: 'Área Técnica', route: 'bench' }
      ]
    },
    {
      name: 'Financeiro', route: '', children: [
        {
          name: 'Cadastros', route: 'financial'
        },///financial/typepay/financial/checkacc
        {
          name: 'Receita', route: '',
          children: [{ name: 'Inserir', route: 'dailyinflow' },]
        },
        {
          name: 'Despesas', route: '', children: [
            { name: 'Mensal', route: 'monthlyoutflow' },
            { name: 'Avulsa', route: 'dailyoutflow' }
          ]
        },
      ],
    },
    {
      name: 'Parceiros', route: 'Parceiros', children: [
        { name: 'Novo', route: 'partner/new' },
        { name: 'Fornecedores Tercerizados', route: 'partners' },
        {
          name: 'Serviços', route: '', children: [
            { name: 'Eletônica', route: 'eletronicrepair' },
            // { name: 'Coleta Entrega', route: 'collectdeliver' },
            { name: ' Coleta Entrega', route: 'delivercollect' },
            { name: ' Dash Mês', route: 'delivercollectdashmonth' }
          ]
        },
      ]


    },
    {
      name: 'Estoque', route: 'Estoque', children: [
        { name: 'Cadastrar Gênero Equipamento', route: 'iteminventory' },
        { name: 'Cadastrar', route: 'createinventory' },
        { name: 'Lista', route: 'inventories' },
      ]
    },

    {
      name: 'Meus Serviços', route: 'Serviços', children: [
        { name: 'Remoção de Equipamento', route: 'collect' },
        {
          name: 'Orçamento', route: 'Serviços', children: [
            { name: 'Novo', route: 'budgetnew' },
            { name: 'Situação Orçamentos', route: 'budgetlist' },
            // { name: 'Administrativo', route: 'budgetlist' },

          ]
        }
      ]
    },












  ]
}
