export const environment = {
  production: true,

  recaptcha: {
    siteKey: '6LevHpolAAAAAA_8TJDZ58zvctT6W-MM51vMyTm9',
  },
  // http://sonnyapp.intra/sonny/api/customers/GetByIdAllIncluded/1
  //AUTHENTICATION
  backEndDoor: 'http://192.168.200.104:5089/api',
  auth: 'http://192.168.200.104:5089/api/auth',
  //ACCOUNT
  _ACCOUNT: 'http://192.168.200.104:5089/api/accounts',
  //FINANCIAL
  _FNBANKSACCOUNTS: 'http://localhost:5000/api/FnBanksAccounts',
  _TYPEPAY: 'http://192.168.200.104:5089/api/typepay',
  _CHEKINGACCOUNTS: 'http://192.168.200.104:5089/api/checkingaccounts',
  _ESSENTIALS_EXPENSES: 'http://192.168.200.104:5089/api/essentialsexpenses',
  _FINANCINGS_LOANS: 'http://192.168.200.104:5089/api/financingsloans',
  //INVENTORY
  _STOCK: 'http://192.168.200.104:5089/api/stock',
  _INVENTORIES_EQUIPAMENT_INCLUDED: 'http://192.168.200.104:5089/api/Inventories/equipamentIncluded',
  _INVENTORIES_PAGED: 'http://192.168.200.104:5089/api/inventories/Paged',
  //CUSTOMER
  _CUSTOMERS: 'http://192.168.200.104:5089/api/customers',
  _CUSTOMERS_BY_ID_ALL_INCLUDED: 'http://192.168.200.104:5089/api/customers/GetByIdAllIncluded',
  _CUSTOMERS_GETALL_PAGED: 'http://192.168.200.104:5089/api/customers/getAllPaged',

  _PARTNERS: 'http://192.168.200.104:5089/api/partners',

  _COLLECTDELIVER: 'http://192.168.200.104:5089/api/collectsdelivers',

  _COLLECTDELIVER_GETALLPAGEDINCLUDED: 'http://192.168.200.104:5089/api/CollectsDelivers/GetAllPagedIncludedAsync',//onInit
  _COMPANIES: 'http://192.168.200.104:5089/api/companies',
  _COLLECTDELIVER_CURRENTMONTH: 'http://192.168.200.104:5089/api/CollectsDelivers/currentMonth',
  _COLLECTDELIVER_INTERVALDATE: 'http://192.168.200.104:5089/api/CollectsDelivers/intervaldate',//date select

  _TECHINFO: 'http://192.168.200.104:5089/api/techinfo',
  _RESOURCES: 'http://192.168.200.104:5089/api/resources',

  _ORDERSERVICES: 'http://192.168.200.104:5089/api/osremoveequipament',
  _CONTACTS: 'http://192.168.200.104:5089/api/contacts',
  _EQUIPAMENTS: 'http://192.168.200.104:5089/api/equipaments',
  _SNETWORKS: 'http://192.168.200.104:5089/api/socialnetworks',
  // _CARDS: 'http://192.168.200.104:5089/api/cards',
  _ELETRONIC_REPAIR: 'http://192.168.200.104:5089/api/eletronicsrepairs',
  //BUDGET
  _SERVICES_BUDGET: 'http://192.168.200.104:5089/api/servicesbudgets',

  //BENCH
  _SERVICES_BENCH: 'http://192.168.200.104:5089/api/ServicesBench',

  //SOLUTIONS_PRICES
  _SOLUTIONS_PRICES: 'http://192.168.200.104:5089/api/solutionsPrices',
};


