
export class ListGridFinancingsLoansExpensesDto {
  id: number;
  category: string;
  subcategory: string;
  start: Date;
  expiration: Date;
  expirationView: Date;
  name: string;
  wasPaid: Date | string;
  wasPaidView: Date | string;
  currentInstallment:string;
  currentInstallmentPaid:string;
  price: string;
}
