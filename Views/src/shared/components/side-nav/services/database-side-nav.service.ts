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
        { name: 'Cadastro e consulta', route: `/side-nav/customer/list/${this.companyId}` },
        // { name: 'Cliente add', route: '/side-nav/create' },
        { name: 'Geral', route: '/side-nav/customer-dash' }
      ],
    },
    {
      name: 'Bancada', icon: 'business_center', toolTip: 'Bancada', opened: false,
      children: [
        { name: 'Cadastros e consulta', opened: false, route: '/side-nav/bench-budget-service-dash' }
        // { name: 'Cadastros e consulta', opened: false, children: [{ name: 'Serviços preços', route: '/side-nav/bench-budget-service-dash/table-provided-services-prices' }] },
        //{ name: 'Serviços', opened: false, children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-services/${this.companyId}` }] },
        // {
        //   name: 'Orçamento', opened: false, children: [{ name: 'Todos', route: `/side-nav/bench-budget-service-dash/list-budgets/${this.companyId}` },
        //   { name: 'Abrir', opened: false, route: `/side-nav/bench-budget-service-dash/open-budget/${this.companyId}` }]
        // },
        // { name: 'Status', opened: false, route: '/side-nav/bench-budget-service-dash' }
      ],
    },
    {
      name: 'Financeiro', icon: 'attach_money', toolTip: 'Financeiro', opened: false,
      children: [
        // {
        //   name: 'Pagamentos', opened: false, children: [{ name: 'Despesas Essenciais', route: '/side-nav/financial/essential-expenses-payment' },
        //   { name: 'Não prevista', opened: false, route: `/side-nav/financial/expenses-no-predictable-payment/${this.companyId}` }]
        // },
        {
          name: 'Contas e Cartões', opened: false, children: [
            { name: 'Cadastro e consulta', route: '/side-nav/financial/list-bank-account-cards' }
          ]
        },
        {
          name: 'Despesas', opened: false, children: [
          // { name: 'Consulta e cadastros', opened: false, route: `/side-nav/financial/select-expenses/${this.companyId}` },
          { name: 'Cardtão de crédito', opened: false, route: `/side-nav/financial/list-credit-card-invoices` },
          { name: 'Financiamento', opened: false, route: `/side-nav/financial/list-financings-loans-expenses` },
          { name: 'Variável', opened: false, route: `/side-nav/financial/list-variable-expenses` },
          { name: 'Mensal', opened: false, route: '/side-nav/financial/list-monthly-fixed-expenses'},
          { name: 'Anual', opened: false, route: '/side-nav/financial/yearly-fixed-expenses-list' },
          { name: 'Pix', opened: false, route: `/side-nav/financial/list-pix-expenses` },
          // { name: 'Cadastro e consulta', opened: false, route: '/side-nav/financial/month-fixed-expenses-add' },
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
      { name: 'Coleta Entrega', opened: false, route: `/side-nav/outsourced-dash/list-collect-deliver-all-months` },
      ]
    },
    {

      name: 'Estoque', icon: 'storage', toolTip: 'Estoque', opened: false,
      children: [
        {
          name: 'Cadastros', opened: false, children: [
            // { name: 'add-update-product', opened: false, route: `/side-nav/stock-product-router/add-item-product` },
            { name: 'Adicionar Produto', opened: false, route: `/side-nav/stock-product-router/add-product` },
            { name: 'Adicionar Produto-2', opened: false, route: `/side-nav/stock-product-router/add-product-n` },
            { name: 'Produtos', opened: false, route: `/side-nav/stock-product-router/card` },

          ]
        },
        { name: 'Lista Produtos', opened: false, route: `/side-nav/stock-product-router/list-product` },
        { name: 'Tests', opened: false, route: `/side-nav/stock-product-router/tests` },
        // { name: 'Lista Produtos', opened: false, route: `/side-nav/product-dash/list-product/${this.companyId}` },
        { name: 'Status', opened: false, route: '/side-nav/partner-dash' },

      ],

    }
    ,
  ];




}
