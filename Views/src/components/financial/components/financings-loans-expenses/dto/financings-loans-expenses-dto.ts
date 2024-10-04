import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";

export class FinancingsLoansExpensesDto extends BaseExpenseDto {
    currentInstallment:string;
    start: Date;
    end: Date;
}
