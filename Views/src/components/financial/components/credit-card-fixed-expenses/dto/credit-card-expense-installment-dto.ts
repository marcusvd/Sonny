import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";

export class CreditCardExpenseInstallmentDto extends BaseExpenseDto {
  installmentNumber: number;
  expenseDay: Date;
}
