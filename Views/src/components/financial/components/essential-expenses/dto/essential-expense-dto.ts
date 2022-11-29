import { EssentialExpenseValueDto } from "./essential-expense-value";

export class EssentialExpenseDto {
  name: string;
  nameOther: string;
  cyclePayment: string;
  expiration: Date;
  duplicate: string;
  user: string;
  password: string;
  comments: string;
  essentialsExpensesValues: EssentialExpenseValueDto[];
}
