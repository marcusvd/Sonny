import { FinancingAndLoanExpenseInstallmentDto } from "../../../dto/financing-and-loan-expense-installment-dto";
import { FinancingsLoansExpensesDto } from "../../../dto/financings-loans-expenses-dto";

export class ListGridFinancingsLoansExpensesInstallmentDto {
  id: number;
  name: string;
  expiration: Date;
  expirationView: Date;
  wasPaid: Date | string;
  wasPaidView: Date | string;
  currentInstallment: string;
  priceWasPaidInstallment: string;

  companyId: number;
  userId: number;
  // user: MyUser;
  bankAccountId: number;
  // bankAccount: BankAccountDto;
  deleted: Date;
  cardId: number;
  // card: CardDto;
  pixId: number;
  // pix: PixDto;
  interest: number;
  expires: Date;
  registered: Date;
  othersPaymentMethods: string;
  document: string;
  financingAndLoanExpense:FinancingsLoansExpensesDto

}
