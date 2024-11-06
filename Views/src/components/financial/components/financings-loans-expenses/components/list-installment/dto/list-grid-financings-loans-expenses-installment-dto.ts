import { FinancingAndLoanExpenseInstallmentDto } from "../../../dto/financing-and-loan-expense-installment-dto";
import { FinancingsLoansExpensesDto } from "../../../dto/financings-loans-expenses-dto";

export class ListGridFinancingsLoansExpensesInstallmentDto {
  id: number;
  name: string;
  expires: Date;
  expiresView: Date;
  wasPaid: Date | string;
  wasPaidView: Date | string;
  currentInstallment: string;
  priceWasPaidInstallment: string;

  companyId: number;
  userId: number;
  bankAccountId: number;
  deleted: Date;
  cardId: number;
  pixId: number;
  interest: number;
   registered: Date;
  othersPaymentMethods: string;
  document: string;
  financingAndLoanExpense:FinancingsLoansExpensesDto

}
