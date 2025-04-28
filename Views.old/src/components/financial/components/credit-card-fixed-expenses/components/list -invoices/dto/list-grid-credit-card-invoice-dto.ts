
export class ListGridCreditCardInvoiceDto {
  id: number;
  userId: string;
  closingDate: Date;
  subcategory: string;
  expires: Date;
  expiresView: Date;
  closingDateBusinessRule:Date;
  name: string;
  wasPaid: Date | string;
  price: string;
  interest: string;
  description: string

}
