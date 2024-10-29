
export class ListGridCreditCardExpensesDto {
  id: number;
  category: string;
  subcategory: string;
  expires: Date;
  expiresView: Date;
  name: string;
  wasPaid: Date | string;
  installmentPrice: string;
  expenseDay:Date | string;
  expenseDayBusinessRule:Date;
  currentInstallment:string;

}
