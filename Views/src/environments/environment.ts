// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  _SUPPLIER: 'http://localhost:5000/api/suppliers',
  _INVENTORIES: 'http://localhost:5000/api/inventories',
  _CATEGORY: 'http://localhost:5000/api/categories',
  _CATEGORIESINCLUDED: 'http://localhost:5000/api/categories/GetAllIncludedAsync',
  _CLIENTS: 'http://localhost:5000/api/clients',
  _UPLOAD: 'http://localhost:5000/api/clients/upload',
  _DAILY: 'http://localhost:5000/api/daily',
  _DEVNETWORK: 'http://localhost:5000/api/devnetwork',
  _FINANCIAL: 'http://localhost:5000/api/financial',
  _INFLOW: 'http://localhost:5000/api/dailyinflow',
  _OUTFLOW: 'http://localhost:5000/api/dailyoutflow',
  _MONTHLYOUTFLOW: 'http://localhost:5000/api/monthlyoutflow',
  _PARTNER: 'http://localhost:5000/api/partner',
  _COLLECTDELIVER: 'http://localhost:5000/api/CollectsDelivers',
  _COMPANIES: 'http://localhost:5000/api/companies',
  _COLLECTDELIVER_CURRENTMONTH: 'http://localhost:5000/api/CollectsDelivers/currentMonth',
  _TECHINFO: 'http://localhost:5000/api/techinfo',
  _RESOURCES: 'http://localhost:5000/api/resources',
  _DAILYCHARGES: 'http://localhost:5000/api/dailycharges',
  _ORDERSERVICES: 'http://localhost:5000/api/osremoveequipament',
  _CONTACTS: 'http://localhost:5000/api/contacts',
  _TYPEPAY: 'http://localhost:5000/api/typepay',
  _ITEMS: 'http://localhost:5000/api/items',
  _CHEKINGACCOUNTS: 'http://localhost:5000/api/checkingaccounts',
  _SNETWORKS: 'http://localhost:5000/api/socialnetworks',
  _CARDS: 'http://localhost:5000/api/cards',
  _ELETRONIC_REPAIR: 'http://localhost:5000/api/eletronicsrepairs',
  _SERVICES_BUDGET: 'http://localhost:5000/api/servicesbudgets',
  _SERVICES_BUDGET_INCLUDED: 'http://localhost:5000/api/servicesbudgets/getbyidasyncincluded',

};
export class GenericsGlobal {

  public static _GENERIC_URL: string = null;

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
