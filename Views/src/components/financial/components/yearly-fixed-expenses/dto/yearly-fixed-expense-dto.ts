import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { YearlyFixedExpenseTrackingDto } from "../../yearly-fixed-expenses-trancking/dto/yearly-fixed-expense-tracking-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";




export class YearlyFixedExpenseDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  categoryExpenses: CategoryExpenseDto;
  subcategoryExpenses: SubcategoryExpenseDto;
  description: string;
  expiration: Date;
  start: Date;
  registered: Date;
  price: number;
  autoRenew: boolean;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  deleted: boolean;
  yearlyFixedExpensesTrackings: YearlyFixedExpenseTrackingDto[];
}
