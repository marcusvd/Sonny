import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";

export class CreditCardExpensesDto extends BaseExpenseDto {
    installmentNumber: number;
    expenseDay: Date;
}
