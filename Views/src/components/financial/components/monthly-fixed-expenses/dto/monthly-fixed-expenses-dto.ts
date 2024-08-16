import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { MonthlyFixedExpensesTrackingDto } from "../../monthly-fixed-expenses-trancking/dto/monthly-fixed-expenses-tracking-dto";





export class MonthlyFixedExpensesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  categoryExpenses: CategoryExpenseDto;
  subcategoryExpenses: SubcategoryExpenseDto;
  description: string;
  expiration: Date;
  registered: Date;
  price: number;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  deleted: boolean;
  monthFixedExpensesTrackings: MonthlyFixedExpensesTrackingDto[];
}
