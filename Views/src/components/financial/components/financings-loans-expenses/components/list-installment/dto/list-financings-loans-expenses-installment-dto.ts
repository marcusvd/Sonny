import { ItemsInterface } from "src/shared/components/list-g/list/interfaces/items-interface";

export class ListFinancingsLoansExpensesInstallmentDto {
  id: ItemsInterface;
  currentInstallment: ItemsInterface;
  priceWasPaidInstallment: ItemsInterface;
  expiresView: ItemsInterface;
  status: ItemsInterface;

  name: ItemsInterface;
  expires: ItemsInterface;
  wasPaid: ItemsInterface;
  wasPaidView: ItemsInterface;
  companyId: ItemsInterface;
  userId: ItemsInterface;
  bankAccountId: ItemsInterface;
  deleted: ItemsInterface;
  cardId: ItemsInterface;
  pixId: ItemsInterface;
  interest: ItemsInterface;
  registered: ItemsInterface;
  othersPaymentMethods: ItemsInterface;
  document: ItemsInterface;
  financingAndLoanExpense: ItemsInterface;
}
