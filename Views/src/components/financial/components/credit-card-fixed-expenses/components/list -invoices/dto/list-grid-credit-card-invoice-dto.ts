
export class ListGridCreditCardInvoiceDto {
  id: number;
  userId: string;
  closingDate: Date;
  subcategory: string;
  expiration: Date;
  expirationView: Date;
  name: string;
  wasPaid: Date | string;
  amountPrice: string;
  interest: string;
  description: string

}
