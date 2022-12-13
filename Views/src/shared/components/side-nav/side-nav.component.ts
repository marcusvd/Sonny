import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';


//tree
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';


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
export class SideNavComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit {

  @ViewChildren(CdkScrollable) scrollable: CdkScrollable

  constructor(
    private _Router: Router,
  ) { this.dataSource.data = this.tree_data; }
  ngAfterContentInit(): void {

  }
  ngAfterViewChecked(): void {

  }




  ngAfterViewInit(): void {
    console.log(this.scrollable)

  }

  ngOnInit(): void {


  }


  nav(route: string) {
    this._Router.navigate([route])
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

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;
  tree_data: TreeMenu[] = [
    // /financial/dailyinflow
    {

      name: 'Clientes', route: 'clientlist', children: [
        // { name: 'Lista', route: '/clientlist' },
        { name: 'Cadastro', route: '/create' },
        // { name: 'Tests', route: '/tests' },
        // {

        //   name: 'Suporte', route: 'Suporte', children: [
        //     { name: 'Lista', route: 'Suporte' }
        //   ]
        // },
      ]
    },
    {
      name: 'Bancada', route: 'Estoque', children: [
        { name: 'Orçamentos', route: 'bench-budget' },
        { name: 'Área Técnica', route: 'technical-bench' }
      ]
    },
    {
      name: 'Financeiro', route: '', children: [
        {
          name: 'Cadastros', route: 'financial'
        },///financial/typepay/financial/checkacc
        // {
        //   name: 'Despesas', route: '', children: [
        //     { name: 'Avulsa', route: 'dailyoutflow' },
        //   ]
        // },
      ],
    },
    {
      name: 'Parceiros', route: 'Parceiros', children: [
        { name: 'Cadastro', route: 'partner/new' },
        {
          name: 'Serviços', route: '', children: [
            { name: 'Eletônica', route: 'eletronicrepair' },
            // { name: 'Coleta Entrega', route: 'collectdeliver' },
            { name: ' Coleta Entrega', route: 'delivercollect' },
            // { name: 'Todos', route: 'delivercollectall' },
            // { name: 'Mês Atual', route: 'delivercollectdashmonth' }
          ]
        },
      ]


    },
    {
      name: 'Estoque', route: 'Estoque', children: [
        { name: 'Cadastro', route: '/navinventory/createinventory' },
        // { name: 'Lista', route: 'inventories' },
        // { name: 'Cadastros', route: 'iteminventory', children:[
        //   { name: 'Gênero Equipamento', route: 'iteminventory' },
        //   { name: 'Equipamento', route: 'createinventory' },
        // ] },
      ]
    },

    {
      name: 'Meus Serviços', route: 'Serviços', children: [
        { name: 'Remoção de Equipamento', route: 'collect' },
        {
          name: 'Orçamento', route: 'Serviços', children: [
            { name: 'Novo', route: 'budgetnew' },
            { name: 'Aguardando análise técnica', route: 'budgetlist' },
            // { name: 'Administrativo', route: 'budgetlist' },

          ]
        }
      ]
    },












  ]
}
