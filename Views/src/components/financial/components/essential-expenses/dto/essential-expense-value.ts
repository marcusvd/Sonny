import { EssentialExpenseDto } from "./essential-expense-dto";

export class EssentialExpenseValueDto {
  id: number;
  value: number;
  paid: Date;
  comments: string
  essentialExpenseId: number;
  essentialExpense: EssentialExpenseDto;
}
