import { CreditCardLimitOperationDto } from "../../bank-account-cards/dto/credit-card-limit-operation-dto";
import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";

export class CreditCardExpenseDto extends BaseExpenseDto {
    installmentNumber: number; 
    installmentPrice: number;
    creditCardLimitOperation: CreditCardLimitOperationDto;
    expenseDay: Date;
}