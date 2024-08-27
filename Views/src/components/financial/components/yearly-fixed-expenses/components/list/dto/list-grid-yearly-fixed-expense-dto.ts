
export class ListGridYearlyFixedExpenseDto {
  id: number;
  category: string;
  subcategory: string;
  start: Date;
  expiration: Date;
  expirationView: Date;
  description: string;
  wasPaid: Date | string;
  wasPaidView: Date | string;
  price: string;
}
