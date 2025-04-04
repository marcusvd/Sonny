import { MyUser } from "src/components/authentication/dto/my-user";
import { CategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";

export class ListGridFinancingsLoansExpensesDto {
  id: number;
  category: string;
  name: string;
  installmentsQuantity: string;
  installmentPrice: string;
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
  totalPriceFinancingOrLoan: number;
  totalPriceInterest: number;
  totalPercentageInterest: number;
  wasPaid: Date | string;
  wasPaidView: Date | string;
  deleted: Date;
  registered: Date;
  description: string;
  linkCopyBill: string;
  uSERLinkCopyBill: string;
  pASSLinkCopyBill: string;

  //control display
  expires: Date;
  expiresView: Date;
  amountAlreadyPaid:string;

}
