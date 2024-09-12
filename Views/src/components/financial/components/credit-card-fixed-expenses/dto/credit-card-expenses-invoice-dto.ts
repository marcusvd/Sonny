import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { CreditCardExpensesDto } from "./credit-card-expenses-dto";

export class CreditCardExpenseInvoiceDto {
   id: number;
   userId: number;
   companyId: number;
   card:CardDto;
   cardId: number;
   amountPrice: number;
   interest: number;
   expires: Date;
   wasPaid: Date;
   othersPaymentMethods: string;
   document: string;
   description: string;
   registered: Date;
   deleted: boolean;
   creditCardExpense: CreditCardExpensesDto;
}
