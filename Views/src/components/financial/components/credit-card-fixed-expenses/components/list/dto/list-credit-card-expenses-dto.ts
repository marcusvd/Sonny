
// export class ListCreditCardExpensesDto {
//   id: number;
//   category: string;
//   subcategory: string;
//   expires: Date;
//   expiresView: Date;
//   name: string;
//   wasPaid: Date | string;
//   installmentPrice: string;
//   expenseDay:Date | string;
//   expenseDayBusinessRule:Date;
//   currentInstallment:string;


// }

import { ItemsInterface } from "../../../../../../../shared/components/list-g/list/interfaces/items-interface";
export class ListCreditCardExpensesDto {
  id: number;
  name: ItemsInterface;
  expenseDay: ItemsInterface;
  installmentPrice: ItemsInterface;
  currentInstallment: ItemsInterface;
  categoryExpenseId:ItemsInterface;
  subcategoryExpenseId:ItemsInterface;
  cardId:ItemsInterface;
  price:ItemsInterface;
  interest:ItemsInterface;
  expires:ItemsInterface;
  wasPaid:ItemsInterface;
  othersPaymentMethods:ItemsInterface;
  document:ItemsInterface;
  description:ItemsInterface;
  installmentsQuantity:ItemsInterface;
  totalPriceInterest:ItemsInterface;
  totalPercentageInterest:ItemsInterface;
  paymentAtSight:ItemsInterface;
  creditCardExpenseInvoiceId:ItemsInterface;
}

