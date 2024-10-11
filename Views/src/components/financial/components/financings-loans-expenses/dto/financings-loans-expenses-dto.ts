import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";

export class FinancingsLoansExpensesDto extends BaseExpenseDto {

    installmentPrice: number;
    currentInstallment: string;
    installmentNumber: number;
    installmentId: number;
    start: Date;
    end: Date;
}
