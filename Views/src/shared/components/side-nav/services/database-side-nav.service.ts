import { Injectable } from "@angular/core";

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
      name: 'Clientes', icon: 'record_voice_over', toolTip: 'Clientes', opened: false,
      children: [
        { name: 'Cadastro e consulta', route: `/side-nav/customer-dash/list/${this.companyId}` },
        // { name: 'Cliente add', route: '/side-nav/customer-dash/create' },
        { name: 'Geral', route: '/side-nav/customer-dash' }
      ],
    },
    {
      name: 'Bancada', icon: 'business_center', toolTip: 'Bancada', opened: false,
      children: [
        { name: 'Cadastros', opened: false, children: [{ name: 'Serviços preços', route: '/side-nav/bench-budget-service-dash/table-provided-services-prices' }] },
        { name: 'Serviços', opened: false, children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-services/${this.companyId}` }] },
        {
          name: 'Orçamento', opened: false, children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-budgets/${this.companyId}` },
          { name: 'Abrir', opened: false, route: `/side-nav/bench-budget-service-dash/open-budget/${this.companyId}` }]
        },
        { name: 'Status', opened: false, route: '/side-nav/bench-budget-service-dash' }
      ],
    },
    {
      name: 'Financeiro', icon: 'attach_money', toolTip: 'Financeiro', opened: false,
      children: [
        // {
        //   name: 'Pagamentos', opened: false, children: [{ name: 'Despesas Essenciais', route: '/side-nav/financial-dash/essential-expenses-payment' },
        //   { name: 'Não prevista', opened: false, route: `/side-nav/financial-dash/expenses-no-predictable-payment/${this.companyId}` }]
        // },
        {
          name: 'Contas e Cartões', opened: false, children: [
            { name: 'Cadastro e consulta', route: '/side-nav/financial-dash/list-bank-account-cards' }
          ]
        },
        {
          name: 'Despesas', opened: false, children: [
          // { name: 'Consulta e cadastros', opened: false, route: `/side-nav/financial-dash/select-expenses/${this.companyId}` },
          { name: 'Cardtão de crédito', opened: false, route: `/side-nav/financial-dash/list-credit-card-invoices` },
          { name: 'Financiamento  Empréstimo', opened: false, route: `/side-nav/financial-dash/list-financings-loans-expenses` },
          { name: 'Variável', opened: false, route: `/side-nav/financial-dash/list-variable-expenses` },
          { name: 'Mensal', opened: false, route: '/side-nav/financial-dash/list-monthly-fixed-expenses'},
          { name: 'Anual', opened: false, route: '/side-nav/financial-dash/yearly-fixed-expenses-list' },
          { name: 'Pix', opened: false, route: `/side-nav/financial-dash/list-pix-expenses` },
          // { name: 'Cadastro e consulta', opened: false, route: '/side-nav/financial-dash/month-fixed-expenses-add' },
        ]
        }
      ]
    },
    {
      name: 'Parceiros', icon: 'transfer_within_a_station', toolTip: 'Parceiros', opened: false,
      children: [
        {
          name: 'Cadastros e consulta', opened: false, route: `/side-nav/partner-dash/list-partner/${this.companyId}`
        },
        { name: 'Acompanhamento', opened: false, route: '/side-nav/partner-dash' }
      ],
    },
    {
      name: 'Terceirização', icon: 'compare_arrows', toolTip: 'Vendas', opened: false, children: [{ name: 'Reparo Eletônico', route: `/side-nav/partner-dash/create-eletronic-repair/${this.companyId}` },
      { name: 'Coleta Entrega', opened: false, route: `/side-nav/partner-dash/list-collect-deliver/${this.companyId}` },
      ]
    },
    {

      name: 'Estoque', icon: 'storage', toolTip: 'Estoque', opened: false,
      children: [
        {
          name: 'Cadastros', opened: false, children: [
            { name: 'Items de produto', opened: false, route: `/side-nav/product-dash/add-item/${this.companyId}` },
            { name: 'Produtos', opened: false, route: `/side-nav/product-dash/add-product/${this.companyId}` },

          ]
        },
        { name: 'Lista Produtos', opened: false, route: `/side-nav/product-dash/list-product/${this.companyId}` },
        { name: 'Status', opened: false, route: '/side-nav/partner-dash' },

      ],

    }
    ,
  ];




}
