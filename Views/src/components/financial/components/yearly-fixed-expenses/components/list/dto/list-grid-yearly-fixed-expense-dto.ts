
export class ListGridYearlyFixedExpenseDto {
  id: number;
  name:string;
  category: string;
  subcategory: string;
  start: Date;
  expires: Date;
  expirationView: Date;
  description: string;
  wasPaid: Date | string;
  wasPaidView: Date | string;
  price: string;
}
