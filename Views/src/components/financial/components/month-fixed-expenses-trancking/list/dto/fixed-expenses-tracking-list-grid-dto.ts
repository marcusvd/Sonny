
export class FixedExpensesTrackingListGridDto {
  id: number;
  fixedExpenses: string;
  expiration: Date;
  expirationView: Date;
  cycle: string;
  wasPaid: Date | string;
  price: string;

}
