
export class ListGridMonthlyFixedExpenseDto {
  id: number;
  category: string;
  subcategory: string;
  expires: Date;
  expiresView: Date;
  name: string;
  wasPaid: Date | string;
  price: string;

}
