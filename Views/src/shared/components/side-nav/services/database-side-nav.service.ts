import { Injectable } from "@angular/core";
import { MatMenu } from "@angular/material/menu";

interface TreeNode {
  name: string;
  route?: string;
  icon?: string;
  toolTip?: string;
  opened?: boolean;
  children?: TreeNode[];
}

@Injectable({ providedIn: 'root' })
export class DatabaseSideNavServices {

  companyId: number = JSON.parse(localStorage.getItem('companyId'));

  dataTree: TreeNode[] = [
    {
      name: 'Clientes', icon: 'record_voice_over', toolTip: 'Clientes', opened:false,
      children: [
        { name: 'Cadastro e consulta', route: '/side-nav/customer-dash/list' },
        { name: 'Cliente add', route: '/side-nav/customer-dash/create' },
        { name: 'Geral', route: '/side-nav/customer-dash' }
      ],
    },
    {
      name: 'Bancada', icon: 'business_center', toolTip: 'Bancada', opened:false,
      children: [
        { name: 'Cadastros',   opened:false, children: [{ name: 'Serviços preços', route: '/side-nav/bench-budget-service-dash/table-provided-services-prices' }] },
        { name: 'Serviços',  opened:false, children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-services/${this.companyId}` }] },
        {
          name: 'Orçamento',  opened:false, children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-budgets/${this.companyId}` },
          { name: 'Abrir',  opened:false, route: `/side-nav/bench-budget-service-dash/open-budget/${this.companyId}` }]
        },
        { name: 'Status',  opened:false, route: '/side-nav/bench-budget-service-dash' }
      ],
    },
    {
      name: 'Financeiro', icon: 'attach_money', toolTip: 'Financeiro', opened:false,
      children: [
        {
          name: 'Pagamentos',  opened:false, children: [{ name: 'Despesas Essenciais', route: '/side-nav/financial-dash/essential-expenses-payment' },
          { name: 'Não prevista',  opened:false, route: `/side-nav/financial-dash/expenses-no-predictable-payment/${this.companyId}` }]
        },
        {
          name: 'Cadastros',  opened:false, children: [{ name: 'Contas e Cartões', route: '/side-nav/financial-dash/bank-accounts' },
          { name: 'Despesas Fixas',  opened:false, route: '/side-nav/financial-dash/expenses-base' }]
        }
      ]
    },
    {
      name: 'Parceiros', icon: 'transfer_within_a_station', toolTip: 'Parceiros', opened:false,
      children: [
        { name: 'Cadastros',  opened:false, children: [{ name: 'Parceiro', route: `/side-nav/partner-dash/create-partner/${this.companyId}` }] },
        {
          name: 'Serviços',  opened:false, children: [{ name: 'Reparo Eletônico', route: `/side-nav/partner-dash/create-eletronic-repair/${this.companyId}` },
          { name: 'Coleta Entrega',  opened:false, route: `/side-nav/partner-dash/create-collect-deliver/${this.companyId}` }]
        },
        { name: 'Acompanhamento',  opened:false, route: '/side-nav/partner-dash' }
      ],
    },
    {

      name: 'Estoque', icon: 'storage', toolTip: 'Estoque', opened:false,
      children: [
        {
          name: 'Cadastros',  opened:false, children: [
            { name: 'Items de produto', opened:false,  route: `/side-nav/product-dash/add-item/${this.companyId}` },
            { name: 'Produtos', opened:false, route: `/side-nav/product-dash/add-product/${this.companyId}` },

          ]
        },
        { name: 'Lista Produtos', opened:false, route: `/side-nav/product-dash/list-product/${this.companyId}` },
        { name: 'Status', opened:false, route: '/side-nav/partner-dash' },

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




}
