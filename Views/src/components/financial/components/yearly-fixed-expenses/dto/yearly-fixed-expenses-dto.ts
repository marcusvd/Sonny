import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CategoryExpensesDto } from "../../month-fixed-expenses/dto/category-expenses-dto";
import { SubcategoryExpensesDto } from "../../month-fixed-expenses/dto/subcategory-expenses-dto";
import { YearlyFixedExpensesTrackingDto } from "../../yearly-fixed-expenses-trancking/dto/yearly-fixed-expenses-tracking-dto";



export class YearlyFixedExpensesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  categoryExpenses: CategoryExpensesDto;
  subcategoryExpenses: SubcategoryExpensesDto;
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
  yearlyFixedExpensesTrackings: YearlyFixedExpensesTrackingDto[];
}
