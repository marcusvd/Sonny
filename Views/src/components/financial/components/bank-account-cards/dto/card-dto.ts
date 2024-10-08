import { CreditCardExpenseInvoiceDto } from "../../credit-card-fixed-expenses/dto/credit-card-expense-invoice-dto";
import { BankAccountDto } from "./bank-account-dto";
import { CreditCardLimitOperationDto } from "./credit-card-limit-operation-dto";
import { TypeCardDtoEnum } from "./enums/type-card-dto.enum";

export class CardDto {
  id: number;
  holder: string;
  flag:string;
  creditLimit: number;
  creditCardLimitOperation:CreditCardLimitOperationDto;
  type: TypeCardDtoEnum;
  number: string;
  cvc: number;
  description:string;
  validate: Date;
  closingDate:Date;
  expiresDate:Date;
  deleted: boolean;
  bankAccountId:number;
  bankAccount:BankAccountDto;
  creditCardExpensesInvoices:CreditCardExpenseInvoiceDto[]
}
