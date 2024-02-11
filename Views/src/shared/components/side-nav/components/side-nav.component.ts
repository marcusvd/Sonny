import { Component, OnInit, Injectable, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


//tree
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';


interface TreeNode {
  name: string;
  route?: string;
  icon?: string;
  toolTip?:string;
  children?: TreeNode[];
}


@Component({
  selector: 'sideNav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {


  userName: string;
  constructor(
    private _Router: Router,
    private _auth: AuthenticationService
  ) {
  }



  logOut() {
    this._auth.logOut();
  }



  ngOnInit(): void {

    this.userName = this._auth.currentUser.userName;

  }


  nav(route: string) {
    this._Router.navigate([route])
  }


  companyId: number = JSON.parse(localStorage.getItem('companyId'));
  dataTree: TreeNode[] = [
    {
      name: 'Clientes', icon: 'record_voice_over', toolTip:'Clientes',
      children: [
        { name: 'Cadastros', route: '/side-nav/customer-dash/create' },
        { name: 'Geral', route: '/side-nav/customer-dash' }
      ],
    },
    {
      name: 'Bancada', icon: 'business_center', toolTip:'Bancada',
      children: [
        { name: 'Cadastros', children: [{ name: 'Serviços preços', route: '/side-nav/bench-budget-service-dash/table-provided-services-prices' }] },
        { name: 'Serviços', children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-services/${this.companyId}` }] },
        { name: 'Orçamento', children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-budgets/${this.companyId}` },
        { name: 'Abrir', route: `/side-nav/bench-budget-service-dash/open-budget/${this.companyId}` }] },
        { name: 'Status', route: '/side-nav/bench-budget-service-dash' }
      ],
    },
    {
      name: 'Financeiro', icon: 'attach_money', toolTip:'Financeiro',
      children: [
        {
          name: 'Pagamentos', children: [{ name: 'Despesas Essenciais', route: '/side-nav/financial-dash/essential-expenses-payment' },
          { name: 'Não prevista', route: `/side-nav/financial-dash/expenses-no-predictable-payment/${this.companyId}` }]
        },
        {
          name: 'Cadastros', children: [{ name: 'Contas e Cartões', route: '/side-nav/financial-dash/bank-accounts' },
          { name: 'Despesas Fixas', route: '/side-nav/financial-dash/expenses-base' }]
        }
      ]
    },
    {
      name: 'Parceiros', icon: 'transfer_within_a_station', toolTip:'Parceiros',
      children: [
        { name: 'Cadastros', children: [{ name: 'Parceiro', route: `/side-nav/partner-dash/create-partner/${this.companyId}` }] },
        { name: 'Serviços', children: [{ name: 'Reparo Eletônico', route: `/side-nav/partner-dash/create-eletronic-repair/${this.companyId}` },
         { name: 'Coleta Entrega', route: `/side-nav/partner-dash/create-collect-deliver/${this.companyId}` }] },
        { name: 'Acompanhamento', route: '/side-nav/partner-dash' }
      ],
    },
    {

      name: 'Estoque', icon: 'storage', toolTip:'Estoque',
      children: [
        { name: 'Cadastros', children: [
          { name: 'Fabricante Equipamento', route: `/side-nav/product-dash/add-manufacturer-name/${this.companyId}` },
          { name: 'Item de produto', route:`/side-nav/product-dash/add-item/${this.companyId}`},
        { name: 'Produtos', route: `/side-nav/product-dash/add-product/${this.companyId}` },

      ] },
        { name: 'Lista Produtos', route: `/side-nav/product-dash/list-product/${this.companyId}` },
        { name: 'Status', route: '/side-nav/partner-dash' },

      ],

    }
    ,
    // {
    //   name: 'Vegetables',
    //   children: [
    //     {
    //       name: 'Green',
    //       children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
    //     },
    //     {
    //       name: 'Orange',
    //       children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
    //     },
    //   ],
    // },
  ];

  navTests(route: string) {
    this._Router.navigate([route + '/' + this.companyId])
  }

  matSideNavStyle: string = 'width:80px;'
  @ViewChild('drawer') drawer: MatDrawer
  toggle() {

    //this.matSideNavStyle === 'width:60px;' ? 'width:60px;':'width:280px;';

    if (this.matSideNavStyle === 'width:80px;')
      this.matSideNavStyle = 'width:280px;'
    else
      this.matSideNavStyle = 'width:80px;';
  }


  collapseAll(){
    this.matSideNavStyle = 'width:80px;';
  }


}
