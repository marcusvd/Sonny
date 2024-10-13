import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { FinancingAndLoanExpenseInstallmentDto } from "./financing-and-loan-expense-installment-dto";

export class FinancingsLoansExpensesDto {

  id: number;
  name: string;
  userId: number;
  user: MyUser;
  companyId: number;
  company: CompanyDto;
  categoryExpenseId: number;
  categoryExpense: CategoryExpenseDto;
  subcategoryExpense: SubcategoryExpenseDto;
  subcategoryExpenseId: number;
  start: Date;
  end: Date;
  totalPriceToBePaid: number;
  totalPriceFinancingOrLoan:number;
  totalPriceInterest: number;
  totalPercentageInterest: number;
  lateFee: number;
  lateFeeDaily: number;
  installmentsQuantity: number;
  installmentPrice: number;
  closed: Date;
  deleted: boolean;
  registered: Date;
  description: string;
  linkCopyBill: string;
  uSERLinkCopyBill: string;
  pASSLinkCopyBill: string;
  financingsAndLoansExpensesInstallments: FinancingAndLoanExpenseInstallmentDto[];
}
