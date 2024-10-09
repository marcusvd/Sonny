import { PixDto } from "../../bank-account-cards/dto/pix-dto";

export class PixExpenseDto {
  id: number;
  pixOutId: number;
  benefitedName: string;
  benefitedKey: string;
  expenseDay: Date;
  deleted: boolean;
  registered: Date;
  monthlyFixedExpenseId: number;
  yearlyFixedExpenseId: number;
  variableExpenseId: number;
  financingAndLoanExpenseId: number;
  description: string;
}
