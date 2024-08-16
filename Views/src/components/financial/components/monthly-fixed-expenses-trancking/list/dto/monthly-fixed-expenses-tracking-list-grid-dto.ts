
export class MonthlyFixedExpensesTrackingListGridDto {
  id: number;
  category: string;
  subcategory: string;
  expiration: Date;
  expirationView: Date;
  description: string;
  wasPaid: Date | string;
  price: string;

}
