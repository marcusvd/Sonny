import { RootBase } from "src/shared/entities-dtos/root-base";
import { CreditCardExpenseInvoiceDto } from "../../credit-card-fixed-expenses/dto/credit-card-expense-invoice-dto";
import { BankAccountDto } from "./bank-account-dto";
import { CreditCardLimitOperationDto } from "./credit-card-limit-operation-dto";
import { TypeCardDtoEnum } from "./enums/type-card-dto.enum";

export class CardDto extends RootBase{
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
  bankAccountId:number;
  bankAccount:BankAccountDto;
  creditCardExpensesInvoices:CreditCardExpenseInvoiceDto[]
}
