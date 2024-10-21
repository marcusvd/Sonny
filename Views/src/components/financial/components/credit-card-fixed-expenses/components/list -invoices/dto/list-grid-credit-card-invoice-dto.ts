
export class ListGridCreditCardInvoiceDto {
  id: number;
  userId: string;
  closingDate: Date;
  subcategory: string;
  expiration: Date;
  expirationView: Date;
  closingDateBusinessRule:Date;
  name: string;
  wasPaid: Date | string;
  price: string;
  interest: string;
  description: string

}
