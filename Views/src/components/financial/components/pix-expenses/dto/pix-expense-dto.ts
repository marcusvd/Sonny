import { PixDto } from "../../bank-account-cards/dto/pix-dto";

export class PixExpenseDto {
  id: number;
  pixOutId: number;
  pixOut: PixDto;
  bankAccountId:number;
  benefitedName: string;
  benefitedKey: string;
  price:number;
  expenseDay: Date;
  deleted: boolean;
  registered: Date;
  monthlyFixedExpenseId: number;
  yearlyFixedExpenseId: number;
  variableExpenseId: number;
  financingAndLoanExpenseId: number;
  description: string;
}
