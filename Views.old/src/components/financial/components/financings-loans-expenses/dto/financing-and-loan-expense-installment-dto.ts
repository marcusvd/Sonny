import { MyUser } from "src/components/authentication/dto/my-user";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { FinancingsLoansExpensesDto } from "./financings-loans-expenses-dto";
import { RootBase } from "src/shared/entities-dtos/root-base";

export class FinancingAndLoanExpenseInstallmentDto extends RootBase {
  bankAccountId: number;
  bankAccount: BankAccountDto;
  cardId: number;
  card: CardDto;
  pixId: number;
  pix: PixDto;
  interest: number;
  priceWasPaidInstallment: number;
  expires: Date;
  wasPaid: Date;
  othersPaymentMethods: string;
  document: string;
  currentInstallment: string;
  financingAndLoanExpense: FinancingsLoansExpensesDto;
  financingAndLoanExpenseId: number;
}
