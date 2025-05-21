import { BankAccountDto } from "src/components/financial/components/bank-account-cards/dto/bank-account-dto";
import { CreditCardExpenseDto } from "../../../dto/credit-card-expense-dto";
import { CardDto } from "src/components/financial/components/bank-account-cards/dto/card-dto";

export class CreditCardExpenseInvoiceDto {
   id:number;
    userId:number;
    companyId:number;
    card: CardDto;
    cardId:number;
    paidFromBankAccountId:number;
    paidFromBankAccount: BankAccountDto;
    price: number;
    interest: number;
    expires: Date;
    closingDate: Date;
    wasPaid:Date;
    othersPaymentMethods: string;
    document: string;
    description: string;
    registered: Date;
    deleted: Date;
    creditCardExpenses: CreditCardExpenseDto[];

}
