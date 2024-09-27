
export class ListGridCreditCardExpensesDto {
  id: number;
  category: string;
  subcategory: string;
  expiration: Date;
  expirationView: Date;
  name: string;
  wasPaid: Date | string;
  installmentPrice: string;

}
