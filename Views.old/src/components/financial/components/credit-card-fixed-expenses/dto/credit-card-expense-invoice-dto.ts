import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { CreditCardExpenseDto } from "./credit-card-expense-dto";

export class CreditCardExpenseInvoiceDto {
   id: number;
   userId: number;
   companyId: number;
   card: CardDto;
   cardId: number;
   // bankAccount:BankAccountDto;
   paidFromBankAccountId: number;
   paidFromBankAccount: BankAccountDto;
   price: number;
   interest: number;
   expires: Date;
   closingDate: Date;
   wasPaid: Date;
   othersPaymentMethods: string;
   document: string;
   description: string;
   registered: Date;
   deleted: boolean;
   creditCardExpenses: CreditCardExpenseDto[];
}
