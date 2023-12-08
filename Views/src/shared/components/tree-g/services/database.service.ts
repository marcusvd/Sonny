import { Injectable } from "@angular/core";

interface TreeNode {
  name: string;
  route?: string;
  icon?: string;
  children?: TreeNode[];
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {

  companyId: number = JSON.parse(localStorage.getItem('companyId'));

  public TREE_DATA: TreeNode[] = [
    {
      name: 'Clientes',icon:'record_voice_over',
      children: [
        { name: 'Cadastros', route: '/side-nav/customer-dash/create' },
        { name: 'Geral', route: '/side-nav/customer-dash' }
      ],
    },
    {
      name: 'Bancada',icon:'business_center',
      children: [
        { name: 'Cadastros', children: [{ name: 'Serviços preços', route:'/side-nav/bench-budget-service-dash/table-provided-services-prices' }] },
        { name: 'Abrir', children: [{ name: 'Orçamento', route: `/side-nav/bench-budget-service-dash/open-budget/${this.companyId}` }] },
        { name: 'Serviços', children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-budgets/${this.companyId}` }] },
        { name: 'Orçamento', children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-services/${this.companyId}` }] },
        { name: 'Status', route: '/side-nav/bench-budget-service-dash' }
      ],
    },
    {
      name: 'Financeiro',icon:'attach_money',
      children: [
        { name: 'Pagamentos', children: [{ name: 'Despesas Essenciais',route:'/side-nav/financial-dash/essential-expenses-payment' },
         { name: 'Não prevista',route:'/side-nav/financial-dash/' }] },
        { name: 'Cadastros', children: [{ name: 'Contas e Cartões',route:'/side-nav/financial-dash/bank-accounts' },
        { name: 'Despesas Fixas',route:'/side-nav/financial-dash/expenses-base' }] }
      ]
    },
    {
      name: 'Parceiros',icon:'transfer_within_a_station',
      children: [
        { name: 'Cadastros', children: [{ name: 'Parceiro', route:`/side-nav/partner-dash/create-partner/${this.companyId}` }] },
        { name: 'Serviços Prestados', children: [{ name: 'Reparo Eletônico', route:`/side-nav/partner-dash/create-eletronic-repair/${this.companyId}` }, { name: 'Coleta Entrega', route:`/side-nav/partner-dash/create-collect-deliver/${this.companyId}` }] },
        { name: 'Acompanhamento', route:'/side-nav/partner-dash'}
      ],
    },
    {

      name: 'Estoque',icon:'storage',
      children: [
        { name: 'Cadastros', children: [{ name: 'Fabricante Equipamento',route:`/side-nav/product-dash/add-manufacturer-name/${this.companyId}` }, { name: 'Produtos',route:`/side-nav/product-dash/add-product/${this.companyId}` }] },
        { name: 'Lista Produtos',route:`/side-nav/product-dash/list-product/${this.companyId}` },
        { name: 'Status', route:'/side-nav/partner-dash'}
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
