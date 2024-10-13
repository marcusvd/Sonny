import { MyUser } from "src/components/authentication/dto/my-user";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { FinancingsLoansExpensesDto } from "./financings-loans-expenses-dto";

export class FinancingAndLoanExpenseInstallmentDto {
  id: number;
  companyId: number;
  userId: number;
  user: MyUser;
  bankAccountId: number;
  bankAccount: BankAccountDto;
  deleted: boolean;
  cardId: number;
  card: CardDto;
  pixId: number;
  pix: PixDto;
  numbererest: number;
  expires: Date;
  registered: Date;
  wasPaid: Date;
  othersPaymentMethods: string;
  document: string;
  priceWasPaidInstallment: number;
  currentInstallment: string;
  financingAndLoanExpense: FinancingsLoansExpensesDto;
  financingAndLoanExpenseId: number;
}
