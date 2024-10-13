
export class ListGridFinancingsLoansExpensesDto {
  // category: string;
  // subcategory: string;
  expiration: Date;
  expirationView: Date;
  wasPaid: Date | string;
  wasPaidView: Date | string;

  id: number;
  category: string;
  name: string;
  installmentsQuantity:string;
  installmentPrice: string;
}
