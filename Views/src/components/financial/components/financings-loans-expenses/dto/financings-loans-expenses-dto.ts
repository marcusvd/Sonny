import { RootBase } from "../../../../../shared/entities-dtos/root-base";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { FinancingAndLoanExpenseInstallmentDto } from "./financing-and-loan-expense-installment-dto";

export class FinancingsLoansExpensesDto extends RootBase {
  name: string;
  categoryExpenseId: number;
  categoryExpense: CategoryExpenseDto;
  subcategoryExpense: SubcategoryExpenseDto;
  subcategoryExpenseId: number;
  start: Date;
  end: Date;
  totalPriceToBePaid: number;
  totalPriceFinancingOrLoan: number;
  totalPriceInterest: number;
  totalPercentageInterest: number;
  installmentsQuantity: number;
  installmentPrice: number;
  wasPaid: Date;
  description: string;
  linkCopyBill: string;
  uSERLinkCopyBill: string;
  pASSLinkCopyBill: string;
  financingsAndLoansExpensesInstallments: FinancingAndLoanExpenseInstallmentDto[];
}
