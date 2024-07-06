
export class YearlyFixedExpensesTrackingListGridDto {
  id: number;
  fixedExpenses: string;
  expiration: Date;
  expirationView: Date;
  nameIdentification: string;
  wasPaid: Date | string;
  price: string;

}
