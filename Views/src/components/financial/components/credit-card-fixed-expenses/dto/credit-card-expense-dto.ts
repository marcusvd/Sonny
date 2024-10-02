import { CreditCardLimitOperationDto } from "../../bank-account-cards/dto/credit-card-limit-operation-dto";
import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";
import { CreditCardExpenseInvoiceDto } from "./credit-card-expense-invoice-dto";

export class CreditCardExpenseDto extends BaseExpenseDto {
    installmentNumber: number;
    installmentPrice: number;
    currentInstallment:string;
    creditCardLimitOperation: CreditCardLimitOperationDto;
    creditCardExpenseInvoiceId: number;
    creditCardExpenseInvoice: CreditCardExpenseInvoiceDto;
    expenseDay: Date;
}
