
export class ListGridFinancingsLoansExpensesInstallmentDto {
  id: number;
  // category: string;
  // subcategory: string;
  // start: Date;
  name: string;
  expiration: Date;
  expirationView: Date;
  wasPaid: Date | string;
  wasPaidView: Date | string;
  currentInstallment:string;
  priceWasPaidInstallment:string;
  price: string;
}
