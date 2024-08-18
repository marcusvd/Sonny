import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { MonthlyFixedExpenseTrackingDto } from "../../monthly-fixed-expenses-trancking/dto/monthly-fixed-expense-tracking-dto";





export class MonthlyFixedExpenseDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  categoryExpense: CategoryExpenseDto;
  subcategoryExpense: SubcategoryExpenseDto;
  description: string;
  expires: Date;
  registered: Date;
  price: number;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  deleted: boolean;
  monthFixedExpensesTrackings: MonthlyFixedExpenseTrackingDto[];
}
