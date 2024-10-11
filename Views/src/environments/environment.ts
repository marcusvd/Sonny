// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



export const environment = {
  production: false,

  recaptcha: {
    siteKey: '6LevHpolAAAAAA_8TJDZ58zvctT6W-MM51vMyTm9',
  },
  //AUTHENTICATION
  backEndDoor: 'http://localhost:5000/api',
  auth: 'http://localhost:5000/api/auth',
  //ACCOUNT
  _ACCOUNT: 'http://localhost:5000/api/accounts',
  //FINANCIAL
  _BANKSACCOUNTS: 'http://localhost:5000/api/_FN_BankAccounts',
  _CATEGORY_EXPENSES: 'http://localhost:5000/api/CategoryExpenses',
  _VARIABLE_EXPENSES: 'http://localhost:5000/api/_FN_VariableExpenses',
  _FN_PIXES_EXPENSES: 'http://localhost:5000/api/_FN_PixesExpenses',
  _MONTHLY_FIXED_EXPENSES: 'http://localhost:5000/api/_FN_MonthlyFixedExpenses',
  _YEARLY_FIXED_EXPENSES: 'http://localhost:5000/api/_FN_YearlyFixedExpenses',
  _FINANCINGS_LOANS_EXPENSES: 'http://localhost:5000/api/_FN_financingsLoansExpenses',
  _CREDIT_CARD_EXPENSES: 'http://localhost:5000/api/_FN_CreditCardExpenses',
  _CREDIT_CARD_EXPENSES_INVOICES: 'http://localhost:5000/api/_FN_CreditCardExpensesInvoices',
  _TYPEPAY: 'http://localhost:5000/api/typepay',
  _CHEKINGACCOUNTS: 'http://localhost:5000/api/checkingaccounts',
  _ESSENTIALS_EXPENSES: 'http://localhost:5000/api/essentialsexpenses',
  //_FINANCINGS_LOANS: 'http://localhost:5000/api/financingsloans',

  //INVENTORY
  _STOCK: 'http://localhost:5000/api/stock',
  _INVENTORIES_EQUIPAMENT_INCLUDED: 'http://localhost:5000/api/Inventories/equipamentIncluded',
  _INVENTORIES_PAGED: 'http://localhost:5000/api/inventories/Paged',
  //CUSTOMER
  _CUSTOMERS: 'http://localhost:5000/api/customers',
  _CUSTOMERS_BY_ID_ALL_INCLUDED: 'http://localhost:5000/api/customers/GetByIdAllIncluded',
  _CUSTOMERS_GETALL_PAGED: 'http://localhost:5000/api/customers/getAllPaged',

  // _UPLOAD: 'http://localhost:5000/api/customers/upload',
  // _DAILY: 'http://localhost:5000/api/daily',
  // _DEVNETWORK: 'http://localhost:5000/api/devnetwork',
  // _FINANCIAL: 'http://localhost:5000/api/financial',
  // _INFLOW: 'http://localhost:5000/api/dailyinflow',
  // _OUTFLOW: 'http://localhost:5000/api/dailyoutflow',
  // _MONTHLYOUTFLOW: 'http://localhost:5000/api/monthlyoutflow',
  _PARTNERS: 'http://localhost:5000/api/partners',

  _COLLECTDELIVER: 'http://localhost:5000/api/collectsdelivers',

  _COLLECTDELIVER_GETALLPAGEDINCLUDED: 'http://localhost:5000/api/CollectsDelivers/GetAllPagedIncludedAsync',//onInit
  _COMPANIES: 'http://localhost:5000/api/companies',
  _COLLECTDELIVER_CURRENTMONTH: 'http://localhost:5000/api/CollectsDelivers/currentMonth',
  _COLLECTDELIVER_INTERVALDATE: 'http://localhost:5000/api/CollectsDelivers/intervaldate',//date select

  _TECHINFO: 'http://localhost:5000/api/techinfo',
  _RESOURCES: 'http://localhost:5000/api/resources',
  // _DAILYCHARGES: 'http://localhost:5000/api/dailycharges',
  _ORDERSERVICES: 'http://localhost:5000/api/osremoveequipament',
  _CONTACTS: 'http://localhost:5000/api/contacts',
  _EQUIPAMENTS: 'http://localhost:5000/api/equipaments',
  _SNETWORKS: 'http://localhost:5000/api/socialnetworks',
  // _CARDS: 'http://localhost:5000/api/cards',
  _ELETRONIC_REPAIR: 'http://localhost:5000/api/eletronicsrepairs',
  //BUDGET
  _SERVICES_BUDGET: 'http://localhost:5000/api/servicesbudgets',
  // _SERVICES_BUDGET_ALL_INCLUDED: 'http://localhost:5000/api/servicesbudgets/GetAllIncludedAsync',
  // _SERVICES_BUDGET_BY_ID_INCLUDED: 'http://localhost:5000/api/servicesbudgets/getbyidasyncincluded',
  //BENCH
  _SERVICES_BENCH: 'http://localhost:5000/api/ServicesBench',

  //SOLUTIONS_PRICES
  _SOLUTIONS_PRICES: 'http://localhost:5000/api/solutionsPrices',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
