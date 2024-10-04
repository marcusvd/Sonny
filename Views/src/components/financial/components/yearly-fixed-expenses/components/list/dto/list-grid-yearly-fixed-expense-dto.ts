
export class ListGridYearlyFixedExpenseDto {
  id: number;
  name:string;
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
