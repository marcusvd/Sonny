import { ItemsInterface } from "../../../../../shared/components/list-g/list/interfaces/items-interface";

export class ListCreditCardInvoiceDto {
  id: ItemsInterface;
  userId: ItemsInterface;
  companyId: ItemsInterface;
  card: ItemsInterface;
  cardId: ItemsInterface;
  // bankAccount:ItemsInterface;
  paidFromBankAccountId: ItemsInterface;
  paidFromBankAccount: ItemsInterface;
  price: ItemsInterface;
  interest: ItemsInterface;
  expires: ItemsInterface;
  closingDate: ItemsInterface;
  wasPaid: ItemsInterface;
  othersPaymentMethods: ItemsInterface;
  document: ItemsInterface;
  description: ItemsInterface;
  registered: ItemsInterface;
  deleted: ItemsInterface;
  creditCardExpenses: ItemsInterface[];
}
