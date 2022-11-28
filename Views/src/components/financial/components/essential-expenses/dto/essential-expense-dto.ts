import { EssentialExpenseValueDto } from "./essential-expense-value";

export class EssentialExpenseDto {
  name:string;
  nameOther:string;
  cyclePayment:string;
  expiration:Date;
  comments:string;
  essentialsExpensesValues:EssentialExpenseValueDto[];
}
